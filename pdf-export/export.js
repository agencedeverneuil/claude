#!/usr/bin/env node
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) {
      out[key] = true;
    } else {
      out[key] = next;
      i++;
    }
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));

const config = {
  url: args.url || 'https://thomasbordron.com',
  out: args.out || 'thomasbordron.pdf',
  format: args.format || 'A4',
  landscape: !!args.landscape,
  printBackground: !args['no-bg'],
  all: !!args.all,
  pages: args.pages ? String(args.pages).split(',').map(s => s.trim()).filter(Boolean) : null,
  wait: parseInt(args.wait || '2500', 10),
  width: parseInt(args.width || '1440', 10),
  height: parseInt(args.height || '900', 10),
  scale: parseFloat(args.scale || '1'),
  fullPage: !!args['single-page'],
  margin: args.margin || '0mm',
};

function log(...m) { console.log('[pdf-export]', ...m); }

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 250;
      const timer = setInterval(() => {
        const max = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        );
        window.scrollBy(0, step);
        total += step;
        if (total >= max + window.innerHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          setTimeout(resolve, 300);
        }
      }, 80);
    });
  });
}

async function waitForReady(page, extraMs) {
  try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch (_) {}
  await page.evaluate(() => Promise.all(
    [...document.images]
      .filter(img => !img.complete)
      .map(img => new Promise(r => { img.onload = img.onerror = r; }))
  ));
  await new Promise(r => setTimeout(r, extraMs));
}

async function discoverPages(browser, baseUrl) {
  const origin = new URL(baseUrl).origin;

  // 1. sitemap.xml
  try {
    const p = await browser.newPage();
    const res = await p.goto(origin + '/sitemap.xml', { timeout: 20000, waitUntil: 'domcontentloaded' });
    if (res && res.ok()) {
      const xml = await p.content();
      const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
        .map(m => m[1].replace(/&amp;/g, '&'))
        .filter(u => u.startsWith(origin));
      await p.close();
      if (urls.length) {
        log(`sitemap.xml → ${urls.length} pages`);
        return urls;
      }
    }
    await p.close();
  } catch (_) { /* fallthrough */ }

  // 2. Crawl internal links from homepage
  const p = await browser.newPage();
  await p.goto(baseUrl, { waitUntil: 'networkidle2', timeout: 90000 });
  const links = await p.evaluate((origin) => {
    return [...new Set(
      [...document.querySelectorAll('a[href]')]
        .map(a => a.href)
        .filter(h => h.startsWith(origin))
        .map(h => h.split('#')[0].replace(/\/$/, ''))
    )];
  }, origin);
  await p.close();
  const clean = [baseUrl.replace(/\/$/, ''), ...links].filter((v, i, a) => a.indexOf(v) === i);
  log(`homepage links → ${clean.length} pages`);
  return clean;
}

async function renderPdf(browser, url, outPath) {
  const page = await browser.newPage();
  await page.setViewport({
    width: config.width,
    height: config.height,
    deviceScaleFactor: 2,
  });
  log('rendering', url, '→', outPath);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 });
  await autoScroll(page);
  await waitForReady(page, config.wait);
  await page.emulateMediaType('screen');

  const pdfOpts = {
    path: outPath,
    printBackground: config.printBackground,
    margin: { top: config.margin, right: config.margin, bottom: config.margin, left: config.margin },
    scale: config.scale,
  };
  if (config.fullPage) {
    const dims = await page.evaluate(() => ({
      w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, window.innerWidth),
      h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, window.innerHeight),
    }));
    pdfOpts.width = `${dims.w}px`;
    pdfOpts.height = `${dims.h}px`;
    pdfOpts.pageRanges = '1';
  } else {
    pdfOpts.format = config.format;
    pdfOpts.landscape = config.landscape;
    pdfOpts.preferCSSPageSize = true;
  }
  await page.pdf(pdfOpts);
  await page.close();
}

async function mergePdfs(files, outPath) {
  const merged = await PDFDocument.create();
  for (const f of files) {
    const src = await PDFDocument.load(fs.readFileSync(f));
    const pages = await merged.copyPages(src, src.getPageIndices());
    pages.forEach(p => merged.addPage(p));
  }
  fs.writeFileSync(outPath, await merged.save());
}

(async () => {
  log('config', JSON.stringify({ ...config, pages: config.pages?.length || null }));
  const browser = await puppeteer.launch({
    headless: 'shell',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'],
  });

  let urls;
  if (config.pages) urls = config.pages;
  else if (config.all) urls = await discoverPages(browser, config.url);
  else urls = [config.url];

  if (urls.length === 1) {
    await renderPdf(browser, urls[0], config.out);
  } else {
    const tmpDir = path.resolve('.pdf-tmp');
    fs.mkdirSync(tmpDir, { recursive: true });
    const files = [];
    for (let i = 0; i < urls.length; i++) {
      const f = path.join(tmpDir, `${String(i + 1).padStart(3, '0')}.pdf`);
      try {
        await renderPdf(browser, urls[i], f);
        files.push(f);
      } catch (err) {
        log('skip', urls[i], '—', err.message);
      }
    }
    await mergePdfs(files, config.out);
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  await browser.close();
  log('done →', path.resolve(config.out));
})().catch(err => { console.error(err); process.exit(1); });

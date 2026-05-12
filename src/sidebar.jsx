// Sidebar component - Claude.ai style
const { useState, useMemo } = React;

function SidebarItem({ icon, label, active, onClick, count, badge }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`sb-item ${active ? "sb-item--active" : ""}`}>
      
      {icon && <span className="sb-item__icon">{icon}</span>}
      <span className="sb-item__label" style={{ fontWeight: "100", fontSize: "12px", color: "rgb(80, 113, 125)" }}>{label}</span>
      {typeof count === "number" && <span className="sb-item__count">{count}</span>}
      {badge && <span className="sb-item__badge">{badge}</span>}
    </button>);

}

function SidebarSection({ title, action, children, collapsible, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="sb-section">
      <div className="sb-section__header">
        {collapsible ?
        <button type="button" className="sb-section__title sb-section__title--btn" onClick={() => setOpen(!open)} style={{ fontWeight: "600" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform .15s" }}>
              <path d="M3 1.5L6.5 5L3 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {title}
          </button> :

        <span className="sb-section__title">{title}</span>
        }
        {action}
      </div>
      {open && <div className="sb-section__body">{children}</div>}
    </div>);

}

function Sidebar({
  view, setView,
  selectedCategory, setSelectedCategory,
  selectedTemplate, setSelectedTemplate,
  selectedProject, setSelectedProject,
  favorites, projects, todos, search, setSearch,
  onNewProject,
  templatesCountByCategory
}) {
  const todosToday = todos.filter((t) => !t.done).length;
  const isView = (v) => view === v;

  return (
    <aside className="sidebar" style={{ backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(244, 244, 244)" }}>
      <div className="sidebar__top">
        <div className="brand">
          <div className="brand__mark">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 5h16M3 11h16M3 17h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="17" cy="17" r="2.2" fill="currentColor" />
            </svg>
          </div>
          <span className="brand__name" style={{ fontFamily: "Inter" }}>Outil UX/UI</span>
        </div>

        <div className="search" style={{ borderColor: "rgb(231, 231, 231)" }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un template…"
            value={search}
            onChange={(e) => setSearch(e.target.value)} />
          
          {search &&
          <button type="button" className="search__clear" onClick={() => setSearch("")} aria-label="Effacer">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          }
        </div>
      </div>

      <nav className="sidebar__nav" style={{ gap: "2px", fontFamily: "Inter" }}>
        <SidebarItem
          icon={<IconHome />}
          label="Tous les templates"
          active={isView("all") && !selectedCategory}
          onClick={() => {setView("all");setSelectedCategory(null);setSelectedTemplate(null);}} />
        
        <SidebarItem
          icon={<IconCheck />}
          label="To-do du jour"
          active={isView("todo")}
          onClick={() => {setView("todo");setSelectedTemplate(null);}}
          count={todosToday || undefined} />
        
        <SidebarItem
          icon={<IconStar />}
          label="Favoris"
          active={isView("favorites")}
          onClick={() => {setView("favorites");setSelectedTemplate(null);}}
          count={favorites.length || undefined} />
        

        <SidebarSection title="Etapes" collapsible>
          {window.TEMPLATE_CATEGORIES.map((cat) =>
          <SidebarItem
            key={cat.id}
            icon={<CategoryIcon id={cat.id} />}
            label={cat.label}
            active={isView("category") && selectedCategory === cat.id}
            onClick={() => {setView("category");setSelectedCategory(cat.id);setSelectedTemplate(null);}}
            count={templatesCountByCategory[cat.id]} />

          )}
        </SidebarSection>

        <SidebarSection
          title="Projets"
          collapsible>
          
          {projects.length === 0 &&
          <div className="sb-empty" style={{ fontWeight: "100", color: "rgb(80, 113, 125)" }}>Aucun projet</div>
          }
          {projects.map((p) =>
          <SidebarItem
            key={p.id}
            icon={<span className="dot" style={{ background: p.color }} />}
            label={p.name}
            active={isView("project") && selectedProject === p.id}
            onClick={() => {setView("project");setSelectedProject(p.id);setSelectedTemplate(null);}} />

          )}
        </SidebarSection>
      </nav>

      <div className="sidebar__footer">
        <button type="button" className="btn btn--primary btn--block" onClick={onNewProject}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
          Nouveau projet
        </button>
      </div>
    </aside>);

}

// Tiny icons
function IconHome() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l5-4 5 4v5H2V7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>;
}
function IconStar() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5l1.7 3.5 3.8.5-2.8 2.7.7 3.8L7 10.2l-3.4 1.8.7-3.8L1.5 5.5l3.8-.5L7 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>;
}
function IconCheck() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7.5l3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

// Outline category icons - Figma-style, 16x16, stroke 1.4
const CATEGORY_ICONS = {
  // Research — magnifying glass
  research:
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>,

  // Discovery — compass
  discovery:
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 6L9 9L6 10L7 7L10 6Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>,

  // Strategy — target
  strategy:
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="0.6" fill="currentColor" />
    </svg>,

  // Ideation — lightbulb
  ideation:
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M5.5 9.5C4.5 8.6 4 7.4 4 6.2 4 4 5.8 2.2 8 2.2s4 1.8 4 4c0 1.2-.5 2.4-1.5 3.3v1.7h-5V9.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M6.5 13h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>,

  // Information architecture — tree / nodes
  ia:
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="6" y="2" width="4" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="2" y="10.5" width="4" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="10" y="10.5" width="4" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 5v2.5M4 10.5v-1A1 1 0 015 8.5h6a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>,

  // Design — pen
  design:
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2.5 13.5L4 12l6.5-6.5 2 2L6 14l-1.5.5h-2V13.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M10.5 5.5l1.5-1.5a1 1 0 011.4 0l.6.6a1 1 0 010 1.4L12.5 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>,

  // Testing — clipboard with check
  testing:
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="3" y="3.5" width="10" height="10" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="5.5" y="2" width="5" height="2.5" rx="0.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 9l1.7 1.7L10.5 7.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,

  // Workshops — people
  workshops:
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="5.5" cy="5.5" r="1.7" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10.5" cy="5.5" r="1.7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 13c0-1.7 1.3-3 3-3s3 1.3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8.5 13c0-1.7 1.3-3 3-3s3 1.3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>

};

function CategoryIcon({ id }) {
  return CATEGORY_ICONS[id] || null;
}

Object.assign(window, { Sidebar });
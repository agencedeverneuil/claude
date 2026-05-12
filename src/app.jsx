// Main app
const { useState: u_S, useEffect: u_E, useMemo: u_M } = React;

// ─── persistence helper ───
function usePersistent(key, initial) {
  const [val, setVal] = React.useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {return initial;}
  });
  React.useEffect(() => {
    try {localStorage.setItem(key, JSON.stringify(val));} catch {}
  }, [key, val]);
  return [val, setVal];
}

const uid = () => Math.random().toString(36).slice(2, 10);
const PROJECT_COLORS = ["#C96442", "#9E7956", "#5B7C99", "#6E7F5D", "#A0654A", "#8C6694"];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "comfortable",
  "fontFamily": "geist",
  "fontSize": 15,
  "accent": "#000000",
  "sidebarWidth": 256
} /*EDITMODE-END*/;

function App() {
  const [view, setView] = usePersistent("ux-view", "all");
  const [selectedCategory, setSelectedCategory] = usePersistent("ux-cat", null);
  const [selectedTemplate, setSelectedTemplate] = usePersistent("ux-tpl", null);
  const [selectedProject, setSelectedProject] = usePersistent("ux-proj", null);
  const [search, setSearch] = u_S("");
  const [favorites, setFavorites] = usePersistent("ux-fav", []);
  const [progress, setProgress] = usePersistent("ux-prog", {}); // {templateId: {stepIdx: bool}}
  const [notes, setNotes] = usePersistent("ux-notes", {}); // {templateId: string}
  const [customTags, setCustomTags] = usePersistent("ux-tags", {}); // {templateId: [tag]}
  const [projects, setProjects] = usePersistent("ux-projects", []);
  const [todos, setTodos] = usePersistent("ux-todos", []);

  const [t, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];

  // Apply tweaks to root
  u_E(() => {
    const root = document.documentElement;
    root.style.setProperty("--ui-font-size", `${t.fontSize}px`);
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--sidebar-w", `${t.sidebarWidth}px`);
    root.dataset.density = t.density;
    root.dataset.font = t.fontFamily;
  }, [t.fontSize, t.accent, t.sidebarWidth, t.density, t.fontFamily]);

  const allTemplates = window.TEMPLATES;

  // Filtering
  const filtered = u_M(() => {
    let list = allTemplates;
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((t) =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      (t.tags || []).some((tg) => tg.toLowerCase().includes(q)) ||
      (customTags[t.id] || []).some((tg) => tg.toLowerCase().includes(q))
      );
    }
    return list;
  }, [allTemplates, search, customTags]);

  const templatesCountByCategory = u_M(() => {
    const counts = {};
    window.TEMPLATE_CATEGORIES.forEach((c) => {counts[c.id] = 0;});
    allTemplates.forEach((t) => {counts[t.category] = (counts[t.category] || 0) + 1;});
    return counts;
  }, [allTemplates]);

  // Favorites
  const toggleFavorite = (id) => {
    setFavorites(favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id]);
  };

  // Notes / tags
  const setTemplateNotes = (templateId, val) => setNotes({ ...notes, [templateId]: val });
  const addTag = (templateId, tag) => {
    const existing = customTags[templateId] || [];
    if (existing.includes(tag)) return;
    setCustomTags({ ...customTags, [templateId]: [...existing, tag] });
  };
  const removeTag = (templateId, tag) => {
    const existing = customTags[templateId] || [];
    setCustomTags({ ...customTags, [templateId]: existing.filter((t) => t !== tag) });
  };

  // Progress
  const setTemplateProgress = (templateId, val) => setProgress({ ...progress, [templateId]: val });

  // Projects
  const newProject = () => {
    const name = prompt("Nom du projet ?", "Nouveau projet");
    if (!name) return;
    const id = uid();
    const color = PROJECT_COLORS[projects.length % PROJECT_COLORS.length];
    setProjects([...projects, { id, name, color, templates: [], createdAt: Date.now() }]);
    setView("project");
    setSelectedProject(id);
  };
  const removeProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
    setView("all");
  };
  const updateProject = (id, patch) => {
    setProjects(projects.map((p) => p.id === id ? { ...p, ...patch } : p));
  };
  const attachToProject = (projectId, templateId) => {
    setProjects(projects.map((p) => {
      if (p.id !== projectId) return p;
      const list = p.templates || [];
      if (list.includes(templateId)) return p;
      return { ...p, templates: [...list, templateId] };
    }));
  };
  const detachFromProject = (projectId, templateId) => {
    setProjects(projects.map((p) => p.id !== projectId ? p : { ...p, templates: (p.templates || []).filter((t) => t !== templateId) }));
  };

  // Todos
  const addTodo = ({ text, projectId }) => {
    setTodos([{ id: uid(), text, projectId, done: false, createdAt: Date.now() }, ...todos]);
  };
  const toggleTodo = (id) => setTodos(todos.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  const removeTodo = (id) => setTodos(todos.filter((t) => t.id !== id));
  const updateTodo = (id, patch) => setTodos(todos.map((t) => t.id === id ? { ...t, ...patch } : t));

  const openTemplate = (id) => setSelectedTemplate(id);
  const backToList = () => setSelectedTemplate(null);

  // Render main content
  let main = null;
  if (selectedTemplate) {
    const tpl = allTemplates.find((t) => t.id === selectedTemplate);
    if (tpl) {
      main =
      <TemplateDetailView
        template={tpl}
        progress={progress[tpl.id]}
        setProgress={(val) => setTemplateProgress(tpl.id, val)}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        projects={projects}
        attachToProject={attachToProject}
        detachFromProject={detachFromProject}
        notes={notes[tpl.id]}
        setNotes={(val) => setTemplateNotes(tpl.id, val)}
        customTags={customTags[tpl.id] || []}
        addTag={(tag) => addTag(tpl.id, tag)}
        removeTag={(tag) => removeTag(tpl.id, tag)}
        onBack={backToList} />;


    }
  } else if (view === "todo") {
    main =
    <TodoView
      todos={todos}
      addTodo={addTodo}
      toggleTodo={toggleTodo}
      removeTodo={removeTodo}
      updateTodo={updateTodo}
      projects={projects} />;


  } else if (view === "favorites") {
    main =
    <FavoritesView
      templates={filtered.filter((t) => favorites.includes(t.id))}
      onOpen={openTemplate}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
      allProgress={progress} />;


  } else if (view === "category" && selectedCategory) {
    main =
    <CategoryView
      categoryId={selectedCategory}
      templates={filtered.filter((t) => t.category === selectedCategory)}
      onOpen={openTemplate}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
      allProgress={progress} />;


  } else if (view === "project" && selectedProject) {
    const proj = projects.find((p) => p.id === selectedProject);
    if (proj) {
      main =
      <ProjectView
        project={proj}
        templates={allTemplates}
        allProgress={progress}
        onOpenTemplate={openTemplate}
        removeProject={removeProject}
        updateProject={updateProject}
        todos={todos}
        addTodo={addTodo}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
        projects={projects}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        detachFromProject={detachFromProject} />;


    } else {
      main = <AllTemplatesView templates={filtered} onOpen={openTemplate} favorites={favorites} onToggleFavorite={toggleFavorite} allProgress={progress} />;
    }
  } else {
    main =
    <AllTemplatesView
      templates={filtered}
      onOpen={openTemplate}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
      allProgress={progress} />;


  }

  return (
    <div className="app" data-screen-label="Outil UX/UI">
      <Sidebar
        view={view} setView={setView}
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
        selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate}
        selectedProject={selectedProject} setSelectedProject={setSelectedProject}
        favorites={favorites} projects={projects} todos={todos}
        search={search} setSearch={setSearch}
        onNewProject={newProject}
        templatesCountByCategory={templatesCountByCategory} />
      
      <main className="main" style={{ color: "rgb(244, 244, 244)" }}>{main}</main>
      <AppTweaks tweaks={t} setTweak={setTweak} />
    </div>);

}

// ─── Tweaks panel ───
function AppTweaks({ tweaks, setTweak }) {
  const TP = window.TweaksPanel;
  const TS = window.TweakSection;
  const TR = window.TweakRadio;
  const TSl = window.TweakSlider;
  const TC = window.TweakColor;
  if (!TP) return null;
  return (
    <TP title="Tweaks">
      <TS title="Apparence">
        <TC label="Couleur d'accent" value={tweaks.accent} onChange={(v) => setTweak("accent", v)}
        options={["#000000", "#C96442", "#5B7C99", "#6E7F5D", "#8C6694"]} />
        <TR label="Densité" value={tweaks.density} onChange={(v) => setTweak("density", v)}
        options={[{ value: "compact", label: "Compact" }, { value: "comfortable", label: "Confortable" }]} />
        <TR label="Police" value={tweaks.fontFamily} onChange={(v) => setTweak("fontFamily", v)}
        options={[{ value: "geist", label: "Sans" }, { value: "serif", label: "Serif" }, { value: "mono", label: "Mono" }]} />
        <TSl label="Taille du texte" value={tweaks.fontSize} onChange={(v) => setTweak("fontSize", v)} min={13} max={18} step={1} unit="px" />
        <TSl label="Largeur sidebar" value={tweaks.sidebarWidth} onChange={(v) => setTweak("sidebarWidth", v)} min={220} max={340} step={4} unit="px" />
      </TS>
    </TP>);

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
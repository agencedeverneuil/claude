// Views: AllTemplates, Category, TemplateDetail, Favorites, Todo, Project
const { useState: useS, useMemo: useM, useEffect: useE } = React;

// ─────── Card grid ───────
function TemplateCard({ template, onOpen, isFavorite, onToggleFavorite, progress }) {
  const total = template.checklist.length;
  const done = progress ? Object.values(progress).filter(Boolean).length : 0;
  const pct = total ? Math.round(done / total * 100) : 0;
  const catLabel = window.TEMPLATE_CATEGORIES.find((c) => c.id === template.category)?.label;

  return (
    <div
      className="tcard"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(template.id)}
      onKeyDown={(e) => {if (e.key === "Enter" || e.key === " ") {e.preventDefault();onOpen(template.id);}}} style={{ borderRadius: "6px" }}>
      
      <div className="tcard__head">
        <span className="tcard__cat">{catLabel}</span>
        <button
          type="button"
          className={`tcard__fav ${isFavorite ? "is-on" : ""}`}
          onClick={(e) => {e.stopPropagation();onToggleFavorite(template.id);}}
          aria-label="Favori">
          
          <svg width="14" height="14" viewBox="0 0 14 14" fill={isFavorite ? "currentColor" : "none"}>
            <path d="M7 1.5l1.7 3.5 3.8.5-2.8 2.7.7 3.8L7 10.2l-3.4 1.8.7-3.8L1.5 5.5l3.8-.5L7 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <h3 className="tcard__title" style={{ fontSize: "18px" }}>{template.title}</h3>
      <p className="tcard__desc">{template.description}</p>
      <div className="tcard__meta">
        <span>{template.checklist.length} étapes</span>
        <span className="tcard__dot">·</span>
        <span>{template.estimatedTime}</span>
      </div>
      {done > 0 &&
      <div className="tcard__progress">
          <div className="tcard__progress-bar" style={{ width: `${pct}%` }} />
          <span className="tcard__progress-label">{done}/{total}</span>
        </div>
      }
    </div>);

}

function TemplateGrid({ templates, ...props }) {
  if (templates.length === 0) {
    return <div className="empty">Aucun template ne correspond.</div>;
  }
  return (
    <div className="tgrid">
      {templates.map((t) =>
      <TemplateCard key={t.id} template={t} {...props} progress={props.allProgress[t.id]} isFavorite={props.favorites.includes(t.id)} />
      )}
    </div>);

}

// ─────── All templates view ───────
function AllTemplatesView(props) {
  const [activeCats, setActiveCats] = useS([]);
  const [open, setOpen] = useS(false);
  const ref = React.useRef(null);
  useE(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const cats = window.TEMPLATE_CATEGORIES;
  const filtered = activeCats.length === 0 ? props.templates : props.templates.filter((t) => activeCats.includes(t.category));
  const toggleCat = (id) => setActiveCats((a) => a.includes(id) ? a.filter((x) => x !== id) : [...a, id]);
  const label = activeCats.length === 0 ? "Toutes les catégories" : activeCats.length === 1 ? cats.find((c) => c.id === activeCats[0])?.label : `${activeCats.length} catégories`;
  return (
    <div className="view">
      <header className="view__header">
        <div>
          <p className="view__eyebrow">Bibliothèque</p>
          <h1 className="view__title" style={{ fontFamily: "Inter" }}>Tous les templates</h1>
          <p className="view__subtitle">{filtered.length} templates, organisés par phase du processus de design.</p>
        </div>
      </header>
      <div className="filterbar" ref={ref}>
        <button type="button" className={`filterbtn ${activeCats.length ? "is-active" : ""}`} onClick={() => setOpen((v) => !v)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 2L2.5 4.5v6L8 13l5.5-2.5v-6L8 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            <path d="M2.5 4.5L8 7m0 0l5.5-2.5M8 7v6" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
          <span>{label}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ opacity: 0.55 }}>
            <path d="M3 4.5L6 7.5l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {open &&
        <div className="filtermenu" role="menu">
            {cats.map((c) => {
            const on = activeCats.includes(c.id);
            return (
              <button key={c.id} type="button" className={`filtermenu__item ${on ? "is-on" : ""}`} onClick={() => toggleCat(c.id)} role="menuitemcheckbox" aria-checked={on}>
                <span className={`filtermenu__check ${on ? "is-on" : ""}`}>
                  {on &&
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  }
                </span>
                <span>{c.label}</span>
              </button>);

          })}
            {activeCats.length > 0 &&
          <button type="button" className="filtermenu__clear" onClick={() => setActiveCats([])}>Réinitialiser</button>
          }
          </div>
        }
      </div>
      <TemplateGrid {...props} templates={filtered} />
    </div>);

}

// ─────── Category view ───────
function CategoryView({ categoryId, ...props }) {
  const cat = window.TEMPLATE_CATEGORIES.find((c) => c.id === categoryId);
  return (
    <div className="view">
      <header className="view__header">
        <p className="view__eyebrow">Catégorie</p>
        <h1 className="view__title">{cat.label}</h1>
        <p className="view__subtitle">{cat.description}</p>
      </header>
      <TemplateGrid {...props} />
    </div>);

}

// ─────── Favorites view ───────
function FavoritesView(props) {
  return (
    <div className="view">
      <header className="view__header">
        <p className="view__eyebrow">Épinglés</p>
        <h1 className="view__title">Favoris</h1>
        <p className="view__subtitle">Vos templates les plus utilisés.</p>
      </header>
      {props.templates.length === 0 ?
      <div className="empty">
          <p>Pas encore de favoris.</p>
          <p className="empty__hint">Cliquez sur l'étoile d'un template pour l'épingler ici.</p>
        </div> :

      <TemplateGrid {...props} />
      }
    </div>);

}

// ─────── Template detail ───────
function TemplateDetailView({
  template, progress, setProgress,
  favorites, onToggleFavorite,
  projects, attachToProject, detachFromProject,
  notes, setNotes,
  customTags, addTag, removeTag,
  onBack
}) {
  const total = template.checklist.length;
  const done = Object.values(progress || {}).filter(Boolean).length;
  const pct = total ? Math.round(done / total * 100) : 0;
  const isFav = favorites.includes(template.id);
  const catLabel = window.TEMPLATE_CATEGORIES.find((c) => c.id === template.category)?.label;
  const linkedProjects = projects.filter((p) => (p.templates || []).includes(template.id));
  const [tagInput, setTagInput] = useS("");
  const [showProjMenu, setShowProjMenu] = useS(false);

  const toggleStep = (i) => {
    setProgress({ ...(progress || {}), [i]: !(progress || {})[i] });
  };

  const allTags = [...(template.tags || []), ...(customTags || [])];

  const downloadMD = () => {
    const md = window.templateToMarkdown(template, progress);
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.id}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    window.print();
  };

  return (
    <div className="view detail">
      <button type="button" className="back" onClick={onBack}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 2L3 6l4.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Retour
      </button>

      <header className="detail__head">
        <p className="view__eyebrow">{catLabel}</p>
        <div className="detail__title-row">
          <h1 className="view__title">{template.title}</h1>
          <button type="button" className={`star ${isFav ? "is-on" : ""}`} onClick={() => onToggleFavorite(template.id)} aria-label="Favori">
            <svg width="18" height="18" viewBox="0 0 14 14" fill={isFav ? "currentColor" : "none"}>
              <path d="M7 1.5l1.7 3.5 3.8.5-2.8 2.7.7 3.8L7 10.2l-3.4 1.8.7-3.8L1.5 5.5l3.8-.5L7 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <p className="detail__desc">{template.description}</p>

        <div className="detail__meta">
          <span className="chip">⏱ {template.estimatedTime}</span>
          <span className="chip">{template.checklist.length} étapes</span>
          {allTags.map((tag) =>
          <span key={tag} className="chip chip--tag">
              #{tag}
              {(customTags || []).includes(tag) &&
            <button type="button" className="chip__close" onClick={() => removeTag(tag)} aria-label="Retirer">×</button>
            }
            </span>
          )}
          <form
            className="chip chip--add"
            onSubmit={(e) => {e.preventDefault();if (tagInput.trim()) {addTag(tagInput.trim());setTagInput("");}}}>
            
            <input
              type="text"
              placeholder="+ tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)} />
            
          </form>
        </div>

        <div className="detail__actions">
          <button type="button" className="btn" onClick={downloadMD}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M3.5 6L7 9.5L10.5 6M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Télécharger Markdown
          </button>
          <button type="button" className="btn" onClick={downloadPDF}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 2h8v10H3V2zM5 5h4M5 7h4M5 9h3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
            Exporter PDF
          </button>
          <div className="dropdown">
            <button type="button" className="btn" onClick={() => setShowProjMenu(!showProjMenu)}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 3.5h4l1 1.5h5v6H2v-7.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
              Lier à un projet
            </button>
            {showProjMenu &&
            <div className="dropdown__menu" onMouseLeave={() => setShowProjMenu(false)}>
                {projects.length === 0 && <div className="dropdown__empty">Créez d'abord un projet</div>}
                {projects.map((p) => {
                const attached = (p.templates || []).includes(template.id);
                return (
                  <button
                    type="button"
                    key={p.id}
                    className="dropdown__item"
                    onClick={() => attached ? detachFromProject(p.id, template.id) : attachToProject(p.id, template.id)}>
                    
                      <span className="dot" style={{ background: p.color }} />
                      <span>{p.name}</span>
                      {attached && <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style={{ marginLeft: "auto" }}><path d="M3 7.5l3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </button>);

              })}
              </div>
            }
          </div>
        </div>

        {linkedProjects.length > 0 &&
        <div className="detail__projects">
            Lié à :
            {linkedProjects.map((p) =>
          <span key={p.id} className="proj-pill"><span className="dot" style={{ background: p.color }} />{p.name}</span>
          )}
          </div>
        }
      </header>

      <div className="progress-bar-wrap">
        <div className="progress-bar"><div className="progress-bar__fill" style={{ width: `${pct}%` }} /></div>
        <span className="progress-bar__label">{done} sur {total} · {pct}%</span>
      </div>

      <section className="checklist">
        <h2 className="checklist__title">Checklist</h2>
        {template.checklist.map((step, i) =>
        <ChecklistItem
          key={i}
          checked={!!(progress || {})[i]}
          label={step}
          onToggle={() => toggleStep(i)} />

        )}
      </section>

      <section className="notes">
        <h2 className="checklist__title">Notes</h2>
        <textarea
          value={notes || ""}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Écrivez vos notes, apprentissages ou décisions pour ce template…"
          rows={8} />
        
      </section>
    </div>);

}

function ChecklistItem({ checked, label, onToggle }) {
  return (
    <label className={`cl-item ${checked ? "cl-item--done" : ""}`}>
      <span className="cl-item__box" onClick={onToggle}>
        {checked &&
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
            <path d="M3 7.5l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      </span>
      <input type="checkbox" checked={checked} onChange={onToggle} style={{ display: "none" }} />
      <span className="cl-item__label" onClick={onToggle}>{label}</span>
    </label>);

}

// ─────── Todo view (global) ───────
function TodoView({ todos, addTodo, toggleTodo, removeTodo, updateTodo, projects }) {
  const [text, setText] = useS("");
  const [projectId, setProjectId] = useS("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo({ text: text.trim(), projectId: projectId || null });
    setText("");
  };

  const grouped = useM(() => {
    const open = todos.filter((t) => !t.done);
    const done = todos.filter((t) => t.done);
    return { open, done };
  }, [todos]);

  return (
    <div className="view">
      <header className="view__header">
        <p className="view__eyebrow">Personnel</p>
        <h1 className="view__title" style={{ fontFamily: "Inter" }}>To-Do</h1>
        <p className="view__subtitle">Capturez tout ce qu'il vous reste à faire, tous templates confondus.</p>
      </header>

      <form className="todo-add" onSubmit={submit}>
        <input
          type="text"
          placeholder="Ajouter une tâche…"
          value={text}
          onChange={(e) => setText(e.target.value)} />
        
        <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
          <option value="">Sans projet</option>
          {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <button type="submit" className="btn btn--primary" style={{ fontFamily: "Inter" }}>Ajouter</button>
      </form>

      <section className="todo-list">
        {grouped.open.length === 0 && grouped.done.length === 0 &&
        <div className="empty" style={{ fontFamily: "Inter" }}>Aucune tâche. Ajoutez la première au-dessus.</div>
        }
        {grouped.open.map((t) => <TodoRow key={t.id} todo={t} projects={projects} onToggle={toggleTodo} onRemove={removeTodo} onUpdate={updateTodo} />)}
        {grouped.done.length > 0 &&
        <div className="todo-done">
            <div className="todo-done__header">Terminées · {grouped.done.length}</div>
            {grouped.done.map((t) => <TodoRow key={t.id} todo={t} projects={projects} onToggle={toggleTodo} onRemove={removeTodo} onUpdate={updateTodo} />)}
          </div>
        }
      </section>
    </div>);

}

function TodoRow({ todo, projects, onToggle, onRemove, onUpdate }) {
  const proj = projects.find((p) => p.id === todo.projectId);
  const [editing, setEditing] = useS(false);
  const [val, setVal] = useS(todo.text);
  return (
    <div className={`todo-row ${todo.done ? "todo-row--done" : ""}`}>
      <span className="cl-item__box" onClick={() => onToggle(todo.id)}>
        {todo.done &&
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 7.5l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        }
      </span>
      {editing ?
      <input
        autoFocus
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={() => {onUpdate(todo.id, { text: val });setEditing(false);}}
        onKeyDown={(e) => {if (e.key === "Enter") {onUpdate(todo.id, { text: val });setEditing(false);}}} /> :


      <span className="todo-row__text" onClick={() => setEditing(true)}>{todo.text}</span>
      }
      {proj && <span className="proj-pill proj-pill--sm"><span className="dot" style={{ background: proj.color }} />{proj.name}</span>}
      <button type="button" className="icon-btn" onClick={() => onRemove(todo.id)} aria-label="Supprimer">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </button>
    </div>);

}

// ─────── Project view ───────
function ProjectView({ project, templates, allProgress, onOpenTemplate, removeProject, updateProject, todos, addTodo, toggleTodo, removeTodo, projects, favorites, onToggleFavorite, detachFromProject }) {
  const projectTemplates = templates.filter((t) => (project.templates || []).includes(t.id));
  const projectTodos = todos.filter((t) => t.projectId === project.id);
  const [editingName, setEditingName] = useS(false);
  const [name, setName] = useS(project.name);
  const [todoText, setTodoText] = useS("");

  // overall progress across all attached templates
  const totalSteps = projectTemplates.reduce((s, t) => s + t.checklist.length, 0);
  const doneSteps = projectTemplates.reduce((s, t) => s + Object.values(allProgress[t.id] || {}).filter(Boolean).length, 0);
  const pct = totalSteps ? Math.round(doneSteps / totalSteps * 100) : 0;

  const submitTodo = (e) => {
    e.preventDefault();
    if (!todoText.trim()) return;
    addTodo({ text: todoText.trim(), projectId: project.id });
    setTodoText("");
  };

  return (
    <div className="view">
      <header className="view__header">
        <p className="view__eyebrow"><span className="dot" style={{ background: project.color }} /> Projet</p>
        <div className="detail__title-row">
          {editingName ?
          <input
            className="title-input"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => {updateProject(project.id, { name: name.trim() || project.name });setEditingName(false);}}
            onKeyDown={(e) => {if (e.key === "Enter") e.target.blur();}} /> :


          <h1 className="view__title" onClick={() => setEditingName(true)}>{project.name}</h1>
          }
          <button type="button" className="icon-btn" onClick={() => {if (confirm("Supprimer ce projet ?")) removeProject(project.id);}} aria-label="Supprimer">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 4h8M5 4V2.5h4V4M5 4v7M9 4v7M3 4l1 8h6l1-8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        {totalSteps > 0 &&
        <div className="progress-bar-wrap" style={{ marginTop: 18 }}>
            <div className="progress-bar"><div className="progress-bar__fill" style={{ width: `${pct}%` }} /></div>
            <span className="progress-bar__label">{doneSteps} sur {totalSteps} · {pct}%</span>
          </div>
        }
      </header>

      <section className="proj-section">
        <h2 className="proj-section__title">Templates liés <span className="muted">· {projectTemplates.length}</span></h2>
        {projectTemplates.length === 0 ?
        <div className="empty empty--inline">
            Aucun template lié. Ouvrez un template et utilisez « Lier à un projet ».
          </div> :

        <div className="tgrid">
            {projectTemplates.map((t) =>
          <TemplateCard
            key={t.id}
            template={t}
            onOpen={onOpenTemplate}
            isFavorite={favorites.includes(t.id)}
            onToggleFavorite={onToggleFavorite}
            progress={allProgress[t.id]} />

          )}
          </div>
        }
      </section>

      <section className="proj-section">
        <h2 className="proj-section__title">To-do du projet <span className="muted">· {projectTodos.filter((t) => !t.done).length} en cours</span></h2>
        <form className="todo-add" onSubmit={submitTodo}>
          <input
            type="text"
            placeholder="Ajouter une tâche pour ce projet…"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)} />
          
          <button type="submit" className="btn btn--primary">Ajouter</button>
        </form>
        <div className="todo-list">
          {projectTodos.length === 0 && <div className="empty empty--inline">Aucune tâche pour ce projet.</div>}
          {projectTodos.filter((t) => !t.done).map((t) => <TodoRow key={t.id} todo={t} projects={projects} onToggle={toggleTodo} onRemove={removeTodo} onUpdate={() => {}} />)}
          {projectTodos.filter((t) => t.done).length > 0 &&
          <div className="todo-done">
              <div className="todo-done__header">Terminées</div>
              {projectTodos.filter((t) => t.done).map((t) => <TodoRow key={t.id} todo={t} projects={projects} onToggle={toggleTodo} onRemove={removeTodo} onUpdate={() => {}} />)}
            </div>
          }
        </div>
      </section>
    </div>);

}

Object.assign(window, { TemplateCard, TemplateGrid, AllTemplatesView, CategoryView, FavoritesView, TemplateDetailView, TodoView, ProjectView, ChecklistItem });
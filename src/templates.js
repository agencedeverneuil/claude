// UX/UI Templates data - inspired by ux.tools/templates
// Each template has: id, title, category, description, estimatedTime, checklist[], downloadMarkdown
window.TEMPLATE_CATEGORIES = [
  { id: "research", label: "Recherche", description: "Comprendre les utilisateurs et le contexte" },
  { id: "discovery", label: "Découverte", description: "Synthétiser et cadrer les apprentissages" },
  { id: "strategy", label: "Stratégie", description: "Définir la direction et la valeur" },
  { id: "ideation", label: "Idéation", description: "Générer et explorer des solutions" },
  { id: "ia", label: "Architecture de l'info", description: "Structurer le contenu et les parcours" },
  { id: "design", label: "Design", description: "Concevoir l'interface et les écrans" },
  { id: "testing", label: "Tests", description: "Valider auprès des utilisateurs" },
  { id: "workshops", label: "Ateliers", description: "Faciliter et aligner les équipes" }
];

window.TEMPLATES = [
  // ─────────── RESEARCH ───────────
  {
    id: "user-interview-guide",
    title: "Guide d'entretien utilisateur",
    category: "research",
    description: "Préparer et conduire un entretien semi-dirigé avec un utilisateur cible.",
    estimatedTime: "60–90 min",
    tags: ["entretien", "qualitatif"],
    checklist: [
      "Définir l'objectif de recherche et les questions clés",
      "Rédiger 8–12 questions ouvertes (du général au spécifique)",
      "Préparer un brise-glace de 2 minutes",
      "Identifier les biais à éviter (questions fermées, suggestives)",
      "Recruter 5–8 participants représentatifs",
      "Envoyer un consentement écrit + autorisation d'enregistrement",
      "Tester le guide sur un collègue (pilote)",
      "Préparer le matériel : enregistreur, prise de notes, prototype",
      "Conduire l'entretien : écouter, relancer, ne pas vendre",
      "Synthétiser à chaud dans les 30 minutes après l'entretien",
      "Coder les verbatims par thèmes",
      "Partager 3 insights clés avec l'équipe"
    ]
  },
  {
    id: "research-plan",
    title: "Plan de recherche",
    category: "research",
    description: "Document de cadrage pour aligner l'équipe avant de lancer une étude.",
    estimatedTime: "2–4 h",
    tags: ["cadrage", "planification"],
    checklist: [
      "Définir le contexte et les enjeux business",
      "Formuler la question de recherche principale",
      "Lister les hypothèses à valider/invalider",
      "Choisir la méthode (entretiens, test, sondage, terrain)",
      "Définir le profil et le nombre de participants",
      "Établir le calendrier et les livrables",
      "Identifier les parties prenantes et leur rôle",
      "Anticiper les risques (recrutement, biais, RGPD)",
      "Faire valider le plan avant exécution"
    ]
  },
  {
    id: "survey-questionnaire",
    title: "Sondage en ligne",
    category: "research",
    description: "Recueillir des données quantitatives auprès d'un large échantillon.",
    estimatedTime: "3–5 h",
    tags: ["quantitatif", "sondage"],
    checklist: [
      "Définir l'objectif et la décision que les données vont éclairer",
      "Identifier la population cible et la taille d'échantillon",
      "Rédiger 8–15 questions (mix fermées/ouvertes)",
      "Utiliser des échelles validées (Likert 5 ou 7 points)",
      "Éviter questions doubles et formulations biaisées",
      "Ajouter des questions démographiques en fin de sondage",
      "Tester sur 3–5 personnes avant le lancement",
      "Choisir l'outil (Typeform, Google Forms, Tally)",
      "Diffuser et suivre le taux de complétion",
      "Analyser : moyennes, distributions, croisements",
      "Visualiser les résultats clés"
    ]
  },
  {
    id: "usability-test-script",
    title: "Script de test d'utilisabilité",
    category: "research",
    description: "Évaluer la facilité d'utilisation d'un produit par observation directe.",
    estimatedTime: "Variable",
    tags: ["test", "observation"],
    checklist: [
      "Définir les hypothèses et les écrans à tester",
      "Rédiger 4–6 tâches réalistes et scénarisées",
      "Préparer le brief participant (durée, confidentialité)",
      "Recruter 5 participants par profil",
      "Vérifier le prototype : flow complet et liens fonctionnels",
      "Tester le script en interne (pilote)",
      "Prévoir un observateur/preneur de notes",
      "Enregistrer écran + audio (avec accord)",
      "Animer en mode 'think aloud'",
      "Recueillir le SUS ou un score de satisfaction",
      "Synthétiser en grille : tâche × participant × succès"
    ]
  },
  {
    id: "heuristic-evaluation",
    title: "Évaluation heuristique (Nielsen)",
    category: "research",
    description: "Audit expert d'une interface via les 10 heuristiques de Nielsen.",
    estimatedTime: "4–8 h",
    tags: ["audit", "expert"],
    checklist: [
      "Lister les écrans/parcours à auditer",
      "Visibilité de l'état du système",
      "Correspondance système ↔ monde réel",
      "Contrôle et liberté de l'utilisateur",
      "Cohérence et standards",
      "Prévention des erreurs",
      "Reconnaissance plutôt que rappel",
      "Flexibilité et efficacité d'usage",
      "Esthétique et design minimaliste",
      "Aide à reconnaître, diagnostiquer, récupérer les erreurs",
      "Aide et documentation",
      "Noter chaque problème sur 1–4 en sévérité",
      "Prioriser et proposer des correctifs"
    ]
  },
  {
    id: "competitive-analysis",
    title: "Analyse concurrentielle",
    category: "research",
    description: "Cartographier les forces et faiblesses des concurrents directs et indirects.",
    estimatedTime: "1 jour",
    tags: ["benchmark", "analyse"],
    checklist: [
      "Lister 5–8 concurrents (directs + indirects + analogues)",
      "Définir les axes de comparaison (fonctions, prix, UX, ton)",
      "Capturer les écrans clés de chacun",
      "Noter les forces, faiblesses, opportunités",
      "Identifier les patterns récurrents",
      "Repérer les angles morts non couverts",
      "Synthétiser dans une matrice comparative",
      "Tirer 3–5 recommandations pour notre produit"
    ]
  },

  // ─────────── DISCOVERY ───────────
  {
    id: "persona",
    title: "Persona",
    category: "discovery",
    description: "Représentation archétypale d'un segment d'utilisateurs cible.",
    estimatedTime: "2–3 h",
    tags: ["persona", "synthèse"],
    checklist: [
      "S'appuyer sur des données réelles (entretiens, analytics)",
      "Nom, photo, âge, métier, contexte de vie",
      "Citation représentative",
      "Objectifs principaux (3 max)",
      "Frustrations et points de douleur",
      "Comportements et habitudes digitales",
      "Outils et environnement utilisés",
      "Motivations profondes",
      "Niveau de maturité tech / domaine",
      "Valider avec l'équipe et les stakeholders"
    ]
  },
  {
    id: "empathy-map",
    title: "Carte d'empathie",
    category: "discovery",
    description: "Visualiser ce que l'utilisateur dit, pense, fait, ressent.",
    estimatedTime: "45–60 min",
    tags: ["empathie", "atelier"],
    checklist: [
      "Définir le persona ou la situation observée",
      "Quadrant 'Dit' : verbatims directs",
      "Quadrant 'Pense' : pensées non exprimées",
      "Quadrant 'Fait' : actions observées",
      "Quadrant 'Ressent' : émotions et état d'esprit",
      "Ajouter : douleurs (pains)",
      "Ajouter : gains espérés",
      "Identifier les tensions et contradictions",
      "Dégager 2–3 insights actionnables"
    ]
  },
  {
    id: "journey-map",
    title: "Carte de parcours utilisateur",
    category: "discovery",
    description: "Cartographier l'expérience étape par étape, du début à la fin.",
    estimatedTime: "Demi-journée",
    tags: ["parcours", "journey"],
    checklist: [
      "Choisir un persona et un scénario précis",
      "Découper en phases (5–8 étapes)",
      "Pour chaque étape : action de l'utilisateur",
      "Pour chaque étape : pensée et émotion",
      "Pour chaque étape : point de contact / canal",
      "Tracer la courbe émotionnelle",
      "Identifier les moments de vérité",
      "Identifier les pain points et opportunités",
      "Ajouter les responsables internes par étape",
      "Prioriser 3 opportunités d'amélioration"
    ]
  },
  {
    id: "service-blueprint",
    title: "Service blueprint",
    category: "discovery",
    description: "Vue d'ensemble du service côté utilisateur ET coulisses.",
    estimatedTime: "1 jour",
    tags: ["service", "système"],
    checklist: [
      "Définir le scénario de service",
      "Ligne 1 : actions de l'utilisateur",
      "Ligne 2 : front-stage (ce que l'utilisateur voit)",
      "Ligne 3 : back-stage (employés non visibles)",
      "Ligne 4 : processus support et systèmes",
      "Identifier les points de contact",
      "Repérer les goulets d'étranglement internes",
      "Lier aux KPI service",
      "Partager avec les équipes ops + produit"
    ]
  },
  {
    id: "jtbd",
    title: "Jobs to be Done",
    category: "discovery",
    description: "Formuler ce que l'utilisateur cherche à 'embaucher' un produit pour faire.",
    estimatedTime: "2 h",
    tags: ["jtbd", "besoin"],
    checklist: [
      "Identifier le contexte de déclenchement (quand…)",
      "Décrire la situation (je veux…)",
      "Préciser le résultat attendu (pour que…)",
      "Capturer la dimension émotionnelle",
      "Capturer la dimension sociale",
      "Lister les solutions actuelles utilisées",
      "Identifier les critères de succès",
      "Prioriser les jobs par fréquence et importance"
    ]
  },
  {
    id: "stakeholder-map",
    title: "Carte des parties prenantes",
    category: "discovery",
    description: "Visualiser qui influence et qui est impacté par le projet.",
    estimatedTime: "1 h",
    tags: ["stakeholders", "alignement"],
    checklist: [
      "Lister toutes les parties prenantes internes",
      "Lister les parties prenantes externes",
      "Positionner sur matrice pouvoir × intérêt",
      "Identifier les sponsors et les sceptiques",
      "Définir la fréquence de communication par groupe",
      "Identifier qui décide vs qui informe",
      "Anticiper les résistances",
      "Planifier 1 entretien d'alignement avec chaque clé"
    ]
  },

  // ─────────── STRATEGY ───────────
  {
    id: "lean-canvas",
    title: "Lean Canvas",
    category: "strategy",
    description: "Synthèse d'un modèle d'affaires sur une page (Ash Maurya).",
    estimatedTime: "2–3 h",
    tags: ["lean", "business"],
    checklist: [
      "Problème : top 3 problèmes utilisateurs",
      "Segments clients (incluant early adopters)",
      "Proposition de valeur unique",
      "Solution : 3 fonctions clés",
      "Canaux de distribution",
      "Flux de revenus",
      "Structure de coûts",
      "Indicateurs clés (3 KPI)",
      "Avantage concurrentiel défendable",
      "Itérer avec l'équipe en atelier"
    ]
  },
  {
    id: "value-proposition",
    title: "Value Proposition Canvas",
    category: "strategy",
    description: "Aligner le produit (gains, pains, fonctions) avec le profil client.",
    estimatedTime: "1–2 h",
    tags: ["valeur", "fit"],
    checklist: [
      "Profil client : tâches à accomplir",
      "Profil client : douleurs",
      "Profil client : gains recherchés",
      "Carte de valeur : produits et services",
      "Carte de valeur : créateurs de gains",
      "Carte de valeur : soulagement de douleurs",
      "Vérifier le 'problem-solution fit'",
      "Tester la proposition de valeur sur 5 prospects"
    ]
  },
  {
    id: "swot",
    title: "Analyse SWOT",
    category: "strategy",
    description: "Forces, Faiblesses, Opportunités, Menaces pour un produit ou une équipe.",
    estimatedTime: "1 h",
    tags: ["analyse", "strat"],
    checklist: [
      "Forces internes (équipe, tech, marque)",
      "Faiblesses internes (dette, manque, gaps)",
      "Opportunités externes (marché, tendances)",
      "Menaces externes (concurrence, régulation)",
      "Croiser Forces × Opportunités → actions",
      "Croiser Faiblesses × Menaces → risques",
      "Prioriser 3 actions stratégiques"
    ]
  },
  {
    id: "product-vision",
    title: "Vision produit",
    category: "strategy",
    description: "Énoncé clair de l'ambition long-terme du produit.",
    estimatedTime: "2 h",
    tags: ["vision", "nord"],
    checklist: [
      "Pour qui (cible primaire)",
      "Qui (insatisfaits de…)",
      "Notre produit est un (catégorie)",
      "Qui (fonction clé)",
      "Contrairement à (alternatives)",
      "Notre solution (différenciateur)",
      "Tester la vision auprès de 3 stakeholders",
      "Afficher la vision dans l'espace de travail"
    ]
  },
  {
    id: "okr",
    title: "OKRs",
    category: "strategy",
    description: "Objectifs ambitieux + résultats clés mesurables (trimestre).",
    estimatedTime: "Demi-journée",
    tags: ["objectifs", "kpi"],
    checklist: [
      "Définir 1–3 objectifs qualitatifs ambitieux",
      "Pour chaque objectif : 2–4 KR mesurables",
      "Vérifier que les KR sont des résultats, pas des tâches",
      "Aligner avec les OKRs de l'équipe supérieure",
      "Définir le rituel de suivi (hebdo/bi-mensuel)",
      "Confidence-vote initial (0–10)",
      "Identifier les dépendances entre équipes",
      "Rétrospective de fin de trimestre"
    ]
  },

  // ─────────── IDEATION ───────────
  {
    id: "crazy-8",
    title: "Crazy 8s",
    category: "ideation",
    description: "Générer 8 idées en 8 minutes pour casser le blanc.",
    estimatedTime: "20 min",
    tags: ["idéation", "sprint"],
    checklist: [
      "Plier une feuille A4 en 8 cases",
      "Cadrer le problème en 1 phrase",
      "Lancer un timer de 8 minutes",
      "1 minute par case = 1 idée par croquis",
      "Pas de jugement, vitesse > qualité",
      "Faire un tour de présentation rapide",
      "Voter en dot-voting (3 votes/personne)",
      "Approfondir les 2 idées gagnantes"
    ]
  },
  {
    id: "hmw",
    title: "How Might We (HMW)",
    category: "ideation",
    description: "Reformuler les insights en questions ouvertes pour l'idéation.",
    estimatedTime: "30–45 min",
    tags: ["reformulation", "atelier"],
    checklist: [
      "Lister les insights et pain points clés",
      "Reformuler chacun en 'Comment pourrait-on… ?'",
      "Vérifier que la question n'embarque pas la solution",
      "Niveau de zoom : ni trop large, ni trop étroit",
      "Tester avec une formulation alternative",
      "Sélectionner 3–5 HMW à explorer en atelier",
      "Lancer une session d'idéation par HMW"
    ]
  },
  {
    id: "storyboard",
    title: "Storyboard",
    category: "ideation",
    description: "Raconter le scénario d'usage en images séquentielles.",
    estimatedTime: "1–2 h",
    tags: ["scénario", "récit"],
    checklist: [
      "Identifier le personnage principal et son besoin",
      "Découper le scénario en 6–12 cases",
      "Case 1 : contexte / déclencheur",
      "Cases intermédiaires : actions et points de friction",
      "Case finale : résultat / émotion",
      "Croquis simples, pas besoin d'être artiste",
      "Annoter chaque case d'une phrase",
      "Partager pour aligner l'équipe"
    ]
  },
  {
    id: "mind-map",
    title: "Mind map",
    category: "ideation",
    description: "Carte mentale pour explorer un sujet en branches associatives.",
    estimatedTime: "30–60 min",
    tags: ["exploration"],
    checklist: [
      "Placer le concept central au milieu",
      "Tracer 5–7 branches principales",
      "Pour chaque branche, sous-branches associatives",
      "Utiliser mots-clés, pas de phrases",
      "Ajouter couleurs ou icônes par thème",
      "Repérer les connexions transversales",
      "Synthétiser en 3 thèmes prioritaires"
    ]
  },
  {
    id: "scamper",
    title: "SCAMPER",
    category: "ideation",
    description: "Sept lentilles pour faire évoluer une idée existante.",
    estimatedTime: "45 min",
    tags: ["créativité"],
    checklist: [
      "Substituer : que remplacer ?",
      "Combiner : que fusionner ?",
      "Adapter : d'où s'inspirer ?",
      "Modifier / Magnifier : que amplifier ?",
      "Proposer un autre usage",
      "Éliminer : que retirer ?",
      "Renverser / Réorganiser : changer l'ordre ?",
      "Garder les 3 directions les plus prometteuses"
    ]
  },

  // ─────────── INFORMATION ARCHITECTURE ───────────
  {
    id: "sitemap",
    title: "Sitemap",
    category: "ia",
    description: "Plan hiérarchique du site ou de l'app.",
    estimatedTime: "2–4 h",
    tags: ["arborescence", "ia"],
    checklist: [
      "Inventorier tous les contenus/écrans existants",
      "Regrouper par thème logique",
      "Définir la hiérarchie (3 niveaux max idéalement)",
      "Nommer chaque section avec le vocabulaire utilisateur",
      "Identifier les écrans utilitaires (404, login, settings)",
      "Visualiser dans un diagramme",
      "Tester via tree testing",
      "Itérer selon les résultats"
    ]
  },
  {
    id: "card-sorting",
    title: "Card sorting",
    category: "ia",
    description: "Comprendre comment les utilisateurs regroupent l'information.",
    estimatedTime: "1 jour de prépa + sessions",
    tags: ["ia", "test"],
    checklist: [
      "Choisir : ouvert, fermé, ou hybride",
      "Préparer 30–60 cartes max",
      "Formuler chaque carte clairement",
      "Recruter 15–30 participants (online) ou 5–8 (in-person)",
      "Briefer sur la tâche",
      "Laisser regrouper sans guider",
      "Demander de nommer chaque groupe",
      "Analyser : matrice de similarité",
      "Identifier les regroupements consensuels",
      "Repérer les cartes 'orphelines' ambiguës"
    ]
  },
  {
    id: "tree-testing",
    title: "Tree testing",
    category: "ia",
    description: "Tester la trouvabilité dans une arborescence (sans UI).",
    estimatedTime: "Demi-journée",
    tags: ["test", "ia"],
    checklist: [
      "Exporter l'arborescence dans Treejack ou équivalent",
      "Rédiger 5–10 tâches de recherche",
      "Recruter 30+ participants",
      "Lancer le test à distance",
      "Analyser : taux de succès par tâche",
      "Analyser : chemins empruntés",
      "Identifier les noeuds confus",
      "Itérer sur l'arborescence"
    ]
  },
  {
    id: "user-flow",
    title: "User flow",
    category: "ia",
    description: "Diagramme du parcours d'écran en écran pour une tâche.",
    estimatedTime: "1–3 h",
    tags: ["flow", "parcours"],
    checklist: [
      "Définir le point d'entrée",
      "Définir la tâche / objectif final",
      "Lister tous les écrans intermédiaires",
      "Représenter les décisions (losanges)",
      "Représenter les états d'erreur",
      "Représenter les boucles éventuelles",
      "Compter les étapes (réduire si > 5)",
      "Valider avec un dev / PM"
    ]
  },

  // ─────────── DESIGN ───────────
  {
    id: "wireframes",
    title: "Wireframes",
    category: "design",
    description: "Maquettes basse fidélité pour cadrer structure et hiérarchie.",
    estimatedTime: "Variable",
    tags: ["wireframe", "low-fi"],
    checklist: [
      "Lister les écrans à wireframer",
      "Définir la grille et les breakpoints",
      "Hiérarchiser le contenu par écran (priorité 1, 2, 3)",
      "Esquisser à la main d'abord",
      "Passer en numérique (Figma/Whimsical)",
      "Annoter les interactions et états",
      "Rester en gris/noir (pas de couleur, pas de typo finale)",
      "Faire revue avec un pair",
      "Valider avant la phase hi-fi"
    ]
  },
  {
    id: "design-brief",
    title: "Brief de design",
    category: "design",
    description: "Document de cadrage avant de démarrer une phase de design.",
    estimatedTime: "2–3 h",
    tags: ["brief", "cadrage"],
    checklist: [
      "Contexte et background du projet",
      "Objectifs business et utilisateur",
      "Public cible (persona principal)",
      "Périmètre : ce qui est dedans / dehors",
      "Contraintes (tech, temps, légal)",
      "Critères de succès mesurables",
      "Calendrier et jalons",
      "Stakeholders et décideurs",
      "Inspirations et anti-inspirations",
      "Validation formelle du brief"
    ]
  },
  {
    id: "style-guide",
    title: "Style guide",
    category: "design",
    description: "Référentiel visuel : couleurs, typo, espacements, composants.",
    estimatedTime: "1–2 semaines",
    tags: ["design system", "guide"],
    checklist: [
      "Palette de couleurs (primaire, secondaire, neutres, sémantique)",
      "Vérifier contrastes WCAG AA / AAA",
      "Typographie : familles, échelles, line-heights",
      "Échelle d'espacement (4 ou 8 px base)",
      "Grille de mise en page",
      "Composants atomiques (boutons, inputs, labels)",
      "Composants moléculaires (cards, modals, navs)",
      "États : default, hover, focus, disabled, error",
      "Iconographie : style et grille",
      "Imagerie : style photographique / illustratif",
      "Voix et ton (microcopy)",
      "Documentation et accès partagé"
    ]
  },
  {
    id: "accessibility-checklist",
    title: "Checklist accessibilité (WCAG)",
    category: "design",
    description: "Vérifier la conformité WCAG 2.2 niveau AA.",
    estimatedTime: "Variable",
    tags: ["a11y", "wcag"],
    checklist: [
      "Contraste texte : 4.5:1 minimum",
      "Contraste grands titres : 3:1 minimum",
      "Navigation au clavier complète",
      "Focus visible sur tous les éléments interactifs",
      "Alternatives textuelles sur les images",
      "Labels explicites sur les champs de formulaire",
      "Messages d'erreur clairs et associés au champ",
      "Hiérarchie de titres (h1 → h6) cohérente",
      "Ne pas reposer uniquement sur la couleur",
      "Vidéos sous-titrées",
      "Compatible avec lecteurs d'écran",
      "Tester avec un utilisateur en situation de handicap"
    ]
  },
  {
    id: "design-handoff",
    title: "Handoff au développement",
    category: "design",
    description: "Préparer le passage de relais design → dev.",
    estimatedTime: "1 jour",
    tags: ["handoff", "dev"],
    checklist: [
      "Tous les écrans finalisés (clean Figma)",
      "Tous les états documentés (vide, chargement, erreur)",
      "Spécifications d'interaction (animations, transitions)",
      "Tokens / variables nommés correctement",
      "Composants reliés au design system",
      "Assets exportés (icônes, illustrations)",
      "Texte définitif (pas de lorem ipsum)",
      "Responsive : breakpoints documentés",
      "Session de walkthrough avec les devs",
      "Canal de questions ouvert (Slack/Notion)"
    ]
  },

  // ─────────── TESTING ───────────
  {
    id: "test-plan",
    title: "Plan de test",
    category: "testing",
    description: "Document de cadrage d'une campagne de test utilisateur.",
    estimatedTime: "2–4 h",
    tags: ["test", "plan"],
    checklist: [
      "Objectifs du test (3 max)",
      "Hypothèses à vérifier",
      "Profil et nombre de participants",
      "Méthode (modéré, non modéré, A/B)",
      "Tâches à faire réaliser",
      "Métriques (succès, temps, SUS, NPS)",
      "Matériel et outil utilisé",
      "Calendrier",
      "Rôles : facilitateur, observateur, prise de notes",
      "Plan d'analyse et livrables"
    ]
  },
  {
    id: "ab-test",
    title: "Plan d'A/B test",
    category: "testing",
    description: "Cadrer un test quantitatif comparatif.",
    estimatedTime: "2 h",
    tags: ["ab", "quantitatif"],
    checklist: [
      "Hypothèse claire : si X alors Y parce que Z",
      "Variant A (contrôle) et variant B (test)",
      "Métrique primaire unique",
      "Métriques secondaires (3 max)",
      "Métriques garde-fou",
      "Taille d'échantillon calculée",
      "Durée prévue",
      "Critère d'arrêt anticipé défini",
      "Plan de lecture des résultats",
      "Décision après test : ship / kill / itérer"
    ]
  },
  {
    id: "test-findings",
    title: "Synthèse de findings",
    category: "testing",
    description: "Restituer les apprentissages d'un test à l'équipe.",
    estimatedTime: "Demi-journée",
    tags: ["restitution"],
    checklist: [
      "Rappel de l'objectif et de la méthode",
      "Profil des participants",
      "3 insights majeurs en haut de page",
      "Problèmes détectés, classés par sévérité",
      "Verbatims illustratifs (1 par insight)",
      "Captures ou vidéos de moments clés",
      "Recommandations actionnables",
      "Prochaines étapes et responsables",
      "Diffusion : présentation orale + document"
    ]
  },

  // ─────────── WORKSHOPS ───────────
  {
    id: "kickoff",
    title: "Atelier de kickoff",
    category: "workshops",
    description: "Lancer un projet en alignant l'équipe sur le pourquoi.",
    estimatedTime: "2–3 h",
    tags: ["kickoff", "atelier"],
    checklist: [
      "Présenter le contexte et l'enjeu",
      "Tour de table : rôles et attentes",
      "Définir la vision / l'objectif du projet",
      "Identifier le persona principal",
      "Lister les hypothèses clés",
      "Identifier les risques et inconnues",
      "Définir les critères de succès",
      "Définir le calendrier macro",
      "Définir les rituels d'équipe",
      "Capter les questions ouvertes"
    ]
  },
  {
    id: "design-sprint",
    title: "Design sprint (5 jours)",
    category: "workshops",
    description: "Sprint Google Ventures : de la cartographie au test en 5 jours.",
    estimatedTime: "5 jours",
    tags: ["sprint", "gv"],
    checklist: [
      "Lundi : cartographier le problème (long terme, map, HMW)",
      "Lundi : interview experts",
      "Mardi : croquis (lightning demos, crazy 8s, solution sketch)",
      "Mercredi : décider (votes, supervote, storyboard)",
      "Jeudi : prototyper (façade testable, pas plus)",
      "Vendredi : tester avec 5 utilisateurs",
      "Vendredi soir : synthèse et décisions",
      "Recruter les 5 testeurs dès le lundi",
      "Préparer la salle (post-its, écrans, snacks)",
      "Décider clairement après le sprint : continuer, pivoter, arrêter"
    ]
  },
  {
    id: "retrospective",
    title: "Rétrospective",
    category: "workshops",
    description: "Réflexion d'équipe en fin de sprint ou de projet.",
    estimatedTime: "1–1.5 h",
    tags: ["retro", "amélioration"],
    checklist: [
      "Rappeler le cadre (sécurité, bienveillance)",
      "Format : Start / Stop / Continue (ou Mad / Sad / Glad)",
      "Tour de partage individuel (5 min)",
      "Regrouper les post-its par thème",
      "Dot voting sur les sujets prioritaires",
      "Discussion sur les 2–3 sujets gagnants",
      "Définir 1–3 actions concrètes",
      "Nommer un owner et une deadline par action",
      "Clôturer avec une note positive"
    ]
  },
  {
    id: "affinity-mapping",
    title: "Affinity mapping",
    category: "workshops",
    description: "Faire émerger les thèmes à partir de données qualitatives.",
    estimatedTime: "2–4 h",
    tags: ["synthèse", "qualitatif"],
    checklist: [
      "Préparer les verbatims sur post-its (1 idée = 1 post-it)",
      "Étaler tout sur un mur ou Miro",
      "Phase 1 : regrouper sans nommer",
      "Phase 2 : nommer chaque cluster",
      "Phase 3 : hiérarchiser les clusters",
      "Identifier les thèmes émergents",
      "Compter les occurrences par thème",
      "Sélectionner 3–5 insights à creuser"
    ]
  }
];

// Build Markdown export for a template (used for download)
window.templateToMarkdown = function(t, progress) {
  const progressMap = progress || {};
  let md = `# ${t.title}\n\n`;
  md += `**Catégorie :** ${window.TEMPLATE_CATEGORIES.find(c => c.id === t.category)?.label}\n`;
  md += `**Temps estimé :** ${t.estimatedTime}\n`;
  if (t.tags && t.tags.length) md += `**Tags :** ${t.tags.join(", ")}\n`;
  md += `\n${t.description}\n\n## Checklist\n\n`;
  t.checklist.forEach((step, i) => {
    const done = progressMap[i] ? "x" : " ";
    md += `- [${done}] ${step}\n`;
  });
  return md;
};

<script>
  // ── Données en dur ──────────────────────────────────────────

  const users = [
    { nom: 'Poncet',  prenom: 'Adri',    pseudo: 'DreadMaster',   role: 'admin'  },
    { nom: 'Leger',   prenom: 'Lolo',     pseudo: 'GifMaster',     role: 'admin'      },
    { nom: 'Celik',   prenom: 'Samed',    pseudo: 'LeBgDelyon',    role: 'instructor' },
    { nom: 'D.',      prenom: 'Jacques',  pseudo: 'PoutinePower',  role: 'student'    },
    { nom: 'Martin',  prenom: 'Sophie',   pseudo: 'SophieBricole', role: 'student'    },
    { nom: 'Dubois',  prenom: 'Marc',     pseudo: 'MarcElec',      role: 'instructor' },
    { nom: 'Bernard', prenom: 'Julie',    pseudo: 'JuliePlomb',    role: 'student'    },
    { nom: 'Petit',   prenom: 'Thomas',   pseudo: 'TomBois',       role: 'student'    },
  ];

  const cours = [
    { titre: 'Installer un robinet mitigeur', categorie: 'Plomberie',   date: '12/04/2025', badge: 'plomb'  },
    { titre: 'Poser une prise électrique',    categorie: 'Électricité', date: '10/04/2025', badge: 'elec'   },
    { titre: 'Assembler un meuble en bois',   categorie: 'Menuiserie',  date: '08/04/2025', badge: 'menu'   },
    { titre: 'Créer un tableau électrique',   categorie: 'Électricité', date: '05/04/2025', badge: 'elec'   },
    { titre: 'Purger un radiateur',           categorie: 'Chauffage',   date: '02/04/2025', badge: 'chauf'  },
    { titre: 'Poser du carrelage mural',      categorie: 'Carrelage',   date: '28/03/2025', badge: 'carr'   },
  ];

  const badges = [
    { nom: 'Première réalisation', icone: '⭐', couleur: 'amber' },
    { nom: 'Cours terminé',        icone: '✓',  couleur: 'green' },
    { nom: 'En progression',       icone: '↑',  couleur: 'blue'  },
    { nom: 'Expert bricoleur',     icone: '🏆', couleur: 'amber' },
  ];

  const categories = [
    { nom: 'Menuiserie',  badge: 'menu'  },
    { nom: 'Plomberie',   badge: 'plomb' },
    { nom: 'Électricité', badge: 'elec'  },
    { nom: 'Chauffage',   badge: 'chauf' },
    { nom: 'Carrelage',   badge: 'carr'  },
    { nom: 'Peinture',    badge: 'peint' },
  ];

  // ── Filtres ─────────────────────────────────────────────────
  let searchUsers = $state('');
  let filterRole  = $state('');
  let searchCours = $state('');
  let searchBadges = $state('');
  let searchCats  = $state('');

  const filteredUsers = $derived(users.filter(u => {
    const matchSearch = !searchUsers ||
      u.nom.toLowerCase().includes(searchUsers.toLowerCase()) ||
      u.prenom.toLowerCase().includes(searchUsers.toLowerCase()) ||
      u.pseudo.toLowerCase().includes(searchUsers.toLowerCase());
    const matchRole = !filterRole || u.role === filterRole;
    return matchSearch && matchRole;
  }));

  const filteredCours = $derived(cours.filter(c =>
    !searchCours || c.titre.toLowerCase().includes(searchCours.toLowerCase())
  ));

  const filteredBadges = $derived(badges.filter(b =>
    !searchBadges || b.nom.toLowerCase().includes(searchBadges.toLowerCase())
  ));

  const filteredCats = $derived(categories.filter(c =>
    !searchCats || c.nom.toLowerCase().includes(searchCats.toLowerCase())
  ));

  // ── Rôle badge config ────────────────────────────────────────
  const roleConfig = {
    admin:      { label: 'Admin',      cls: 'badge--pink'  },
    instructor: { label: 'Instructor', cls: 'badge--amber' },
    student:    { label: 'Student',    cls: 'badge--green' },
  };
</script>

<div class="dashboard">
  <div class="dashboard__header">
    <h1 class="dashboard__title">Mon tableau de bord</h1>
  </div>

  <div class="dashboard__grid">

    <!-- ══════════════════════════════
         PANEL 1 — Utilisateurs
    ══════════════════════════════ -->
    <div class="panel">
      <div class="panel__head">
        <h2 class="panel__title">Utilisateurs</h2>
        <span class="panel__count">{filteredUsers.length}</span>
      </div>

      <div class="panel__filters">
        <input
          class="input"
          type="text"
          placeholder="Rechercher..."
          bind:value={searchUsers}
        />
        <select class="input input--select" bind:value={filterRole}>
          <option value="">Tous les rôles</option>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
          <option value="stagiaire">Stagiaire</option>
        </select>
      </div>

      <!-- En-tête colonnes -->
      <div class="table-head">
        <span>Nom</span>
        <span>Prénom</span>
        <span>Pseudo</span>
        <span>Rôle</span>
      </div>

      <div class="panel__list">
        {#each filteredUsers as user}
          <div class="table-row">
            <span class="table-row__cell">{user.nom}</span>
            <span class="table-row__cell">{user.prenom}</span>
            <span class="table-row__cell table-row__cell--pseudo">{user.pseudo}</span>
            <span class="badge {roleConfig[user.role]?.cls}">
              {roleConfig[user.role]?.label ?? user.role}
            </span>
          </div>
        {/each}

        {#if filteredUsers.length === 0}
          <p class="panel__empty">Aucun utilisateur trouvé.</p>
        {/if}
      </div>
    </div>

    <!-- ══════════════════════════════
         PANEL 2 — Cours
    ══════════════════════════════ -->
    <div class="panel">
      <div class="panel__head">
        <h2 class="panel__title">Cours</h2>
        <span class="panel__count">{filteredCours.length}</span>
      </div>

      <div class="panel__filters">
        <input
          class="input"
          type="text"
          placeholder="Rechercher..."
          bind:value={searchCours}
        />
      </div>

      <div class="panel__list">
        {#each filteredCours as c}
          <div class="list-row">
            <div class="list-row__info">
              <p class="list-row__title">{c.titre}</p>
              <span class="badge badge--cat badge--{c.badge}">{c.categorie}</span>
            </div>
            <span class="list-row__date">{c.date}</span>
          </div>
        {/each}

        {#if filteredCours.length === 0}
          <p class="panel__empty">Aucun cours trouvé.</p>
        {/if}
      </div>
    </div>

    <!-- ══════════════════════════════
         PANEL 3 — Badges
    ══════════════════════════════ -->
    <div class="panel">
      <div class="panel__head">
        <h2 class="panel__title">Gestion des badges</h2>
        <button class="btn-add" title="Ajouter un badge">+</button>
      </div>

      <div class="panel__filters">
        <input
          class="input"
          type="text"
          placeholder="Rechercher..."
          bind:value={searchBadges}
        />
      </div>

      <div class="panel__list">
        {#each filteredBadges as b}
          <div class="list-row list-row--badge">
            <div class="badge-icon badge-icon--{b.couleur}">
              {b.icone}
            </div>
            <p class="list-row__title">{b.nom}</p>
            <div class="list-row__actions">
              <button class="action-btn action-btn--edit">Modifier</button>
              <button class="action-btn action-btn--delete">Supprimer</button>
            </div>
          </div>
        {/each}

        {#if filteredBadges.length === 0}
          <p class="panel__empty">Aucun badge trouvé.</p>
        {/if}
      </div>
    </div>

    <!-- ══════════════════════════════
         PANEL 4 — Catégories
    ══════════════════════════════ -->
    <div class="panel">
      <div class="panel__head">
        <h2 class="panel__title">Gestion des catégories</h2>
        <button class="btn-add" title="Ajouter une catégorie">+</button>
      </div>

      <div class="panel__filters">
        <input
          class="input"
          type="text"
          placeholder="Rechercher..."
          bind:value={searchCats}
        />
      </div>

      <div class="panel__list">
        {#each filteredCats as cat}
          <div class="list-row">
            <span class="badge badge--cat badge--{cat.badge}">{cat.nom}</span>
            <div class="list-row__actions">
              <button class="action-btn action-btn--edit">Modifier</button>
              <button class="action-btn action-btn--delete">Supprimer</button>
            </div>
          </div>
        {/each}

        {#if filteredCats.length === 0}
          <p class="panel__empty">Aucune catégorie trouvée.</p>
        {/if}
      </div>
    </div>

  </div>
</div>

<style>
  /* ── Tokens ─────────────────────────────────────────────── */
  .dashboard {
    --blue:       #1D4E89;
    --blue-l:     #EBF2FA;
    --blue-m:     #B5D4F4;
    --amber:      #F5A623;
    --amber-l:    #FEF5E7;
    --amber-m:    #FAC775;
    --bg:         #F7F4EF;
    --dark:       #2C3E50;
    --white:      #ffffff;
    --gray:       #6B7280;
    --border:     rgba(44, 62, 80, 0.1);
    --green-l:    #EAF3DE;
    --green-d:    #27500A;
    --green-m:    #C0DD97;
    --pink-l:     #FDEDEC;
    --pink-d:     #A93226;
    --pink-m:     #F1948A;
    --pur-l:      #F4ECF7;
    --pur-d:      #7D3C98;
    --teal-l:     #E1F5EE;
    --teal-d:     #085041;
    --r-md:       10px;
    --r-lg:       16px;
    --font:       'DM Sans', sans-serif;

    font-family: var(--font);
    background:  var(--bg);
    min-height:  100vh;
    padding:     32px 40px 60px;
  }

  /* ── Header page ─────────────────────────────────────────── */
  .dashboard__header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-bottom: 28px;
  }

  .dashboard__title {
    font-family: 'DM Serif Display', serif;
    font-size: 28px;
    font-weight: 400;
    color: var(--dark);
    margin: 0;
  }

  .dashboard__role-pill {
    background: var(--pink-l);
    color: var(--pink-d);
    border: 0.5px solid var(--pink-m);
    font-size: 11px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 100px;
    letter-spacing: 0.04em;
  }

  /* ── Grid 2x2 ────────────────────────────────────────────── */
  .dashboard__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  /* ── Panel ───────────────────────────────────────────────── */
  .panel {
    background: var(--white);
    border: 0.5px solid var(--border);
    border-radius: var(--r-lg);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .panel__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .panel__title {
    font-size: 15px;
    font-weight: 500;
    color: var(--blue);
    margin: 0;
  }

  .panel__count {
    background: var(--blue-l);
    color: var(--blue);
    font-size: 11px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 100px;
  }

  .panel__filters {
    display: flex;
    gap: 8px;
  }

  .panel__list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 320px;
    overflow-y: auto;
  }

  .panel__list::-webkit-scrollbar {
    width: 4px;
  }
  .panel__list::-webkit-scrollbar-track {
    background: var(--bg);
    border-radius: 4px;
  }
  .panel__list::-webkit-scrollbar-thumb {
    background: var(--blue-m);
    border-radius: 4px;
  }

  .panel__empty {
    font-size: 13px;
    color: var(--gray);
    text-align: center;
    padding: 20px 0;
  }

  /* ── Inputs ──────────────────────────────────────────────── */
  .input {
    height: 36px;
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    padding: 0 12px;
    font-family: var(--font);
    font-size: 13px;
    color: var(--dark);
    background: var(--bg);
    flex: 1;
    outline: none;
    transition: border-color 0.15s;
  }

  .input:focus {
    border-color: var(--blue);
    background: var(--white);
  }

  .input--select {
    flex: 0 0 140px;
    cursor: pointer;
  }

  /* ── Table utilisateurs ──────────────────────────────────── */
  .table-head {
    display: grid;
    grid-template-columns: 1fr 1fr 1.2fr auto;
    gap: 8px;
    padding: 0 10px;
  }

  .table-head span {
    font-size: 11px;
    font-weight: 600;
    color: var(--gray);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .table-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1.2fr auto;
    gap: 8px;
    align-items: center;
    padding: 9px 10px;
    border-radius: var(--r-md);
    background: var(--bg);
    border: 0.5px solid transparent;
    transition: border-color 0.15s, background 0.15s;
  }

  .table-row:hover {
    background: var(--blue-l);
    border-color: var(--blue-m);
  }

  .table-row__cell {
    font-size: 13px;
    color: var(--dark);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .table-row__cell--pseudo {
    color: var(--gray);
    font-size: 12px;
  }

  /* ── List rows (cours, badges, cats) ─────────────────────── */
  .list-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 12px;
    border-radius: var(--r-md);
    background: var(--bg);
    border: 0.5px solid transparent;
    transition: border-color 0.15s, background 0.15s;
  }

  .list-row:hover {
    background: var(--blue-l);
    border-color: var(--blue-m);
  }

  .list-row__info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    min-width: 0;
  }

  .list-row__title {
    font-size: 13px;
    font-weight: 500;
    color: var(--dark);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .list-row__date {
    font-size: 11px;
    color: var(--gray);
    flex-shrink: 0;
  }

  .list-row--badge {
    gap: 12px;
  }

  .list-row__actions {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
  }

  /* ── Badges ──────────────────────────────────────────────── */
  .badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 600;
    white-space: nowrap;
  }

  .badge--blue   { background: var(--blue-l);  color: var(--blue);    border: 0.5px solid var(--blue-m);  }
  .badge--amber  { background: var(--amber-l); color: #BA7517;        border: 0.5px solid var(--amber-m); }
  .badge--green  { background: var(--green-l); color: var(--green-d); border: 0.5px solid var(--green-m); }
  .badge--pink   { background: var(--pink-l);  color: var(--pink-d);  border: 0.5px solid var(--pink-m);  }

  /* Badges catégories */
  .badge--cat { font-size: 11px; }
  .badge--plomb { background: var(--blue-l);  color: var(--blue);    border: 0.5px solid var(--blue-m);  }
  .badge--elec  { background: var(--amber-l); color: #BA7517;        border: 0.5px solid var(--amber-m); }
  .badge--menu  { background: var(--green-l); color: var(--green-d); border: 0.5px solid var(--green-m); }
  .badge--chauf { background: var(--pur-l);   color: var(--pur-d);   border: 0.5px solid #D7BDE2;        }
  .badge--carr  { background: var(--pink-l);  color: var(--pink-d);  border: 0.5px solid var(--pink-m);  }
  .badge--peint { background: #F5F5F4;        color: #57534E;        border: 0.5px solid #D6D3D1;        }

  /* ── Badge icône ─────────────────────────────────────────── */
  .badge-icon {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }

  .badge-icon--amber { background: var(--amber-l); border: 2px solid var(--amber); }
  .badge-icon--green { background: var(--green-l); border: 2px solid #27AE60;      }
  .badge-icon--blue  { background: var(--blue-l);  border: 2px solid var(--blue);  }

  /* ── Boutons action ──────────────────────────────────────── */
  .btn-add {
    width: 28px;
    height: 28px;
    border-radius: var(--r-md);
    border: 1.5px solid var(--amber);
    background: var(--amber-l);
    color: #BA7517;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;
    line-height: 1;
  }

  .btn-add:hover {
    background: var(--amber);
    color: var(--white);
  }

  .action-btn {
    font-family: var(--font);
    font-size: 11px;
    font-weight: 500;
    padding: 4px 8px;
    border-radius: 6px;
    cursor: pointer;
    border: 0.5px solid transparent;
    transition: background 0.15s, color 0.15s;
  }

  .action-btn--edit {
    background: var(--blue-l);
    color: var(--blue);
    border-color: var(--blue-m);
  }

  .action-btn--edit:hover {
    background: var(--blue);
    color: var(--white);
  }

  .action-btn--delete {
    background: var(--pink-l);
    color: var(--pink-d);
    border-color: var(--pink-m);
  }

  .action-btn--delete:hover {
    background: var(--pink-d);
    color: var(--white);
  }

  /* ── Responsive ──────────────────────────────────────────── */
  @media (max-width: 1024px) {
    .dashboard {
      padding: 24px 24px 48px;
    }
  }

  @media (max-width: 768px) {
    .dashboard {
      padding: 16px 16px 48px;
      overflow-x: hidden;
    }

    .dashboard__grid {
      grid-template-columns: 1fr;
    }

    .panel {
      min-width: 0;
      overflow: hidden;
    }

    .table-head,
    .table-row {
      grid-template-columns: 1fr 1fr auto;
    }

    /* Masquer prénom sur mobile */
    .table-head span:nth-child(2),
    .table-row__cell:nth-child(2) {
      display: none;
    }

    .input--select {
      flex: 1;
    }
  }
</style>
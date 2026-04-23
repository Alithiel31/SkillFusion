<script>
  // ── Données en dur ──────────────────────────────────────────

  const mesCours = [
    { titre: 'Installer un robinet mitigeur', categorie: 'Plomberie',   badge: 'plomb', apprenants: 12, note: 4.8, date: '12/04/2025' },
    { titre: 'Poser une prise électrique',    categorie: 'Électricité', badge: 'elec',  apprenants: 8,  note: 4.5, date: '10/04/2025' },
    { titre: 'Assembler un meuble en bois',   categorie: 'Menuiserie',  badge: 'menu',  apprenants: 5,  note: 5.0, date: '08/04/2025' },
    { titre: 'Purger un radiateur',           categorie: 'Chauffage',   badge: 'chauf', apprenants: 3,  note: 4.2, date: '02/04/2025' },
  ];

  const notifications = [
    { auteur: 'Antoine L.',  type: 'question', contenu: "Que faire si l'écrou est rouillé ?",       cours: 'Installer un robinet',  lu: false, heure: '14h32' },
    { auteur: 'Sophie M.',   type: 'question', contenu: 'Quel type de téflon utiliser ?',           cours: 'Installer un robinet',  lu: false, heure: '11h15' },
    { auteur: 'Pierre T.',   type: 'avis',     contenu: 'Excellent cours, très clair !',            cours: 'Poser une prise',       lu: true,  heure: '09h40' },
    { auteur: 'Laura K.',    type: 'question', contenu: 'Un cours sur les douches est-il prévu ?',  cours: 'Installer un robinet',  lu: true,  heure: 'Hier'  },
    { auteur: 'Thomas B.',   type: 'avis',     contenu: 'Super contenu, bien détaillé.',            cours: 'Assembler un meuble',   lu: true,  heure: 'Hier'  },
  ];

  // ── État ────────────────────────────────────────────────────
  let searchCours = $state('');

  const filteredCours = $derived(
    mesCours.filter(c =>
      !searchCours || c.titre.toLowerCase().includes(searchCours.toLowerCase())
    )
  );

  const nonLues = $derived(notifications.filter(n => !n.lu).length);

  const totalApprenants = $derived(mesCours.reduce((sum, c) => sum + c.apprenants, 0));
  const noteMoyenne = $derived(
    (mesCours.reduce((sum, c) => sum + c.note, 0) / mesCours.length).toFixed(1)
  );

  // ── Config types notifs ──────────────────────────────────────
  const typeConfig = {
    question: { label: 'Question', cls: 'notif--question' },
    avis:     { label: 'Avis',     cls: 'notif--avis'     },
  };
</script>

<div class="dashboard">

  <div class="dashboard__header">
    <h1 class="dashboard__title">Mon tableau de bord</h1>
  </div>

  <div class="dashboard__grid">

    <!-- ══════════════════════════════
         PANEL 1 — Mes cours
    ══════════════════════════════ -->
    <div class="panel panel--large">
      <div class="panel__head">
        <h2 class="panel__title">Mes cours</h2>
        <div class="panel__head-actions">
          <span class="panel__count">{filteredCours.length}</span>
          <button class="btn-add" title="Nouveau cours">+ Nouveau cours</button>
        </div>
      </div>

      <div class="panel__filters">
        <input
          class="input"
          type="text"
          placeholder="Rechercher un cours..."
          bind:value={searchCours}
        />
      </div>

      <div class="panel__list">
        {#each filteredCours as c}
          <div class="course-row">
            <div class="course-row__thumb course-row__thumb--{c.badge}"></div>
            <div class="course-row__body">
              <div class="course-row__top">
                <p class="course-row__title">{c.titre}</p>
              </div>
              <div class="course-row__meta">
                <span class="meta-item">
                  <span class="meta-item__icon">👥</span>
                  {c.apprenants} apprenant{c.apprenants > 1 ? 's' : ''}
                </span>
                <span class="meta-item">
                  <span class="meta-item__icon star">★</span>
                  {c.note}/5
                </span>
                <span class="meta-item meta-item--date">{c.date}</span>
              </div>
            </div>
            <div class="course-row__actions">
              <a href="/cours/{c.titre}/edit" class="action-btn action-btn--edit">Modifier</a>
            </div>
          </div>
        {/each}

        {#if filteredCours.length === 0}
          <p class="panel__empty">Aucun cours trouvé.</p>
        {/if}
      </div>
    </div>

    <!-- ══════════════════════════════
         PANEL 2 — Notifications
    ══════════════════════════════ -->
    <div class="panel">
      <div class="panel__head">
        <h2 class="panel__title">Notifications</h2>
        {#if nonLues > 0}
          <span class="notif-badge">{nonLues} nouvelle{nonLues > 1 ? 's' : ''}</span>
        {/if}
      </div>

      <div class="panel__list panel__list--notifs">
        {#each notifications as n}
          <div class="notif {typeConfig[n.type]?.cls}" class:notif--unread={!n.lu}>
            <div class="notif__top">
              <div class="notif__meta">
                <span class="notif__auteur">{n.auteur}</span>
                <span class="notif__type-pill notif__type-pill--{n.type}">
                  {typeConfig[n.type]?.label}
                </span>
              </div>
              <span class="notif__heure">{n.heure}</span>
            </div>
            <p class="notif__contenu">{n.contenu}</p>
            <p class="notif__cours">↳ {n.cours}</p>
            {#if n.type === 'question' && !n.lu}
              <button class="notif__reply-btn">Répondre</button>
            {/if}
          </div>
        {/each}
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
    --green:      #27AE60;
    --green-l:    #EAF3DE;
    --green-d:    #27500A;
    --green-m:    #C0DD97;
    --pink-l:     #FDEDEC;
    --pink-d:     #A93226;
    --pink-m:     #F1948A;
    --pur-l:      #F4ECF7;
    --pur-d:      #7D3C98;
    --r-md:       10px;
    --r-lg:       16px;
    --font:       'DM Sans', sans-serif;

    font-family: var(--font);
    background:  var(--bg);
    min-height:  100vh;
    padding:     32px 40px 60px;
  }

  /* ── Header ─────────────────────────────────────────────── */
  .dashboard__header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 24px;
  }

  .dashboard__title {
    font-family: 'DM Serif Display', serif;
    font-size: 28px;
    font-weight: 400;
    color: var(--dark);
    margin: 0;
  }

  .dashboard__role-pill {
    background: var(--amber-l);
    color: #BA7517;
    border: 0.5px solid var(--amber-m);
    font-size: 11px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 100px;
    letter-spacing: 0.04em;
  }

  /* ── Stats ──────────────────────────────────────────────── */
  .stats {
    display: flex;
    gap: 14px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .stat-card {
    background: var(--white);
    border: 0.5px solid var(--border);
    border-radius: var(--r-lg);
    padding: 16px 20px;
    flex: 1;
    min-width: 100px;
  }

  .stat-card--alert-active {
    background: var(--amber-l);
    border-color: var(--amber-m);
  }

  .stat-card__value {
    font-family: 'DM Serif Display', serif;
    font-size: 28px;
    color: var(--blue);
    margin: 0 0 2px;
  }

  .stat-card--alert-active .stat-card__value {
    color: #BA7517;
  }

  .stat-card__label {
    font-size: 12px;
    color: var(--gray);
    margin: 0;
  }

  /* ── Grid ───────────────────────────────────────────────── */
  .dashboard__grid {
    display: grid;
    grid-template-columns: 1.7fr 1fr;
    gap: 20px;
    align-items: start;
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
    min-width: 0;
    overflow: hidden;
  }

  .panel__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .panel__head-actions {
    display: flex;
    align-items: center;
    gap: 8px;
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
    gap: 8px;
  }

  .panel__list--notifs {
    max-height: 480px;
    overflow-y: auto;
    gap: 6px;
  }

  .panel__list--notifs::-webkit-scrollbar { width: 4px; }
  .panel__list--notifs::-webkit-scrollbar-track { background: var(--bg); border-radius: 4px; }
  .panel__list--notifs::-webkit-scrollbar-thumb { background: var(--blue-m); border-radius: 4px; }

  .panel__empty {
    font-size: 13px;
    color: var(--gray);
    text-align: center;
    padding: 20px 0;
  }

  /* ── Input ───────────────────────────────────────────────── */
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

  /* ── Course row ─────────────────────────────────────────── */
  .course-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px;
    background: var(--bg);
    border-radius: var(--r-md);
    border: 0.5px solid transparent;
    transition: border-color 0.15s, background 0.15s;
  }

  .course-row:hover {
    background: var(--blue-l);
    border-color: var(--blue-m);
  }

  .course-row__thumb {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    flex-shrink: 0;
  }

  .course-row__thumb--plomb { background: var(--blue);    }
  .course-row__thumb--elec  { background: #BA7517;        }
  .course-row__thumb--menu  { background: var(--green-d); }
  .course-row__thumb--chauf { background: var(--pur-d);   }
  .course-row__thumb--carr  { background: var(--pink-d);  }
  .course-row__thumb--peint { background: #57534E;        }

  .course-row__body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .course-row__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .course-row__title {
    font-size: 13px;
    font-weight: 500;
    color: var(--dark);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .course-row__meta {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .meta-item {
    font-size: 11px;
    color: var(--gray);
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .meta-item__icon { font-size: 12px; }
  .meta-item__icon.star { color: var(--amber); }
  .meta-item--date { margin-left: auto; }

  .course-row__actions {
    flex-shrink: 0;
  }

  /* ── Boutons ─────────────────────────────────────────────── */
  .btn-add {
    padding: 6px 12px;
    border-radius: var(--r-md);
    border: 1.5px solid var(--amber);
    background: var(--amber-l);
    color: #BA7517;
    font-family: var(--font);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    white-space: nowrap;
  }

  .btn-add:hover {
    background: var(--amber);
    color: var(--white);
  }

  .action-btn {
    font-family: var(--font);
    font-size: 11px;
    font-weight: 500;
    padding: 5px 10px;
    border-radius: 6px;
    cursor: pointer;
    border: 0.5px solid transparent;
    text-decoration: none;
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

  /* ── Notifications ───────────────────────────────────────── */
  .notif-badge {
    background: var(--amber);
    color: var(--white);
    font-size: 11px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 100px;
  }

  .notif {
    padding: 12px 14px;
    border-radius: var(--r-md);
    background: var(--bg);
    border: 0.5px solid transparent;
    display: flex;
    flex-direction: column;
    gap: 5px;
    transition: border-color 0.15s;
  }

  .notif--unread {
    background: var(--blue-l);
    border-left: 3px solid var(--blue);
  }

  .notif__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .notif__meta {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .notif__auteur {
    font-size: 12px;
    font-weight: 600;
    color: var(--dark);
  }

  .notif__type-pill {
    font-size: 10px;
    font-weight: 600;
    padding: 2px 7px;
    border-radius: 100px;
  }

  .notif__type-pill--question {
    background: var(--blue-l);
    color: var(--blue);
    border: 0.5px solid var(--blue-m);
  }

  .notif__type-pill--avis {
    background: var(--green-l);
    color: var(--green-d);
    border: 0.5px solid var(--green-m);
  }

  .notif__heure {
    font-size: 10px;
    color: var(--gray);
    flex-shrink: 0;
  }

  .notif__contenu {
    font-size: 12px;
    color: var(--dark);
    margin: 0;
    line-height: 1.5;
  }

  .notif__cours {
    font-size: 11px;
    color: var(--gray);
    margin: 0;
  }

  .notif__reply-btn {
    align-self: flex-start;
    font-family: var(--font);
    font-size: 11px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 6px;
    background: var(--blue);
    color: var(--white);
    border: none;
    cursor: pointer;
    margin-top: 2px;
    transition: opacity 0.15s;
  }

  .notif__reply-btn:hover { opacity: 0.85; }

  /* ── Badges catégories ───────────────────────────────────── */
  .badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 600;
    white-space: nowrap;
  }

  .badge--plomb { background: var(--blue-l);  color: var(--blue);    border: 0.5px solid var(--blue-m);  }
  .badge--elec  { background: var(--amber-l); color: #BA7517;        border: 0.5px solid var(--amber-m); }
  .badge--menu  { background: var(--green-l); color: var(--green-d); border: 0.5px solid var(--green-m); }
  .badge--chauf { background: var(--pur-l);   color: var(--pur-d);   border: 0.5px solid #D7BDE2;        }
  .badge--carr  { background: var(--pink-l);  color: var(--pink-d);  border: 0.5px solid var(--pink-m);  }
  .badge--peint { background: #F5F5F4;        color: #57534E;        border: 0.5px solid #D6D3D1;        }

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

    .stats {
      gap: 10px;
    }

    .stat-card {
      padding: 12px 14px;
      min-width: calc(50% - 5px);
    }

    .stat-card__value {
      font-size: 22px;
    }

    .panel__list--notifs {
      max-height: 320px;
    }

    .meta-item--date {
      display: none;
    }
  }
</style>
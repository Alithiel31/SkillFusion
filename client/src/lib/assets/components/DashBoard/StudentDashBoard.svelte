<script>
  // ── Données en dur ──────────────────────────────────────────

  const coursEnCours = [
    { titre: 'Installer un robinet mitigeur', categorie: 'Plomberie',   badge: 'plomb', progression: 40 },
    { titre: 'Poser une prise électrique',    categorie: 'Électricité', badge: 'elec',  progression: 75 },
    { titre: 'Assembler un meuble en bois',   categorie: 'Menuiserie',  badge: 'menu',  progression: 10 },
  ];

  const coursTermines = [
    { titre: 'Réparer un joint de robinet', categorie: 'Plomberie',   badge: 'plomb', dateTermine: '02/03/2025' },
    { titre: 'Peindre une pièce entière',   categorie: 'Peinture',    badge: 'peint', dateTermine: '14/01/2025' },
  ];

  const mesSucces = [
    { nom: 'Première réalisation', icone: '⭐', couleur: 'amber', debloque: true  },
    { nom: 'Cours terminé',        icone: '✓',  couleur: 'green', debloque: true  },
    { nom: 'En progression',       icone: '↑',  couleur: 'blue',  debloque: true  },
    { nom: 'Expert bricoleur',     icone: '🏆', couleur: 'amber', debloque: false },
    { nom: '5 cours terminés',     icone: '🔥', couleur: 'blue',  debloque: false },
  ];

  const totalBadges   = mesSucces.length;
  const debloques     = mesSucces.filter(b => b.debloque).length;
  const progressBadge = Math.round((debloques / totalBadges) * 100);
</script>

<div class="dashboard">

  <div class="dashboard__header">
    <h1 class="dashboard__title">Mon tableau de bord</h1>
    <span class="dashboard__role-pill dashboard__role-pill--student">Étudiant</span>
  </div>

  <!-- Stat rapides -->
  <div class="stats">
    <div class="stat-card">
      <p class="stat-card__value">{coursEnCours.length}</p>
      <p class="stat-card__label">Cours en cours</p>
    </div>
    <div class="stat-card">
      <p class="stat-card__value">{coursTermines.length}</p>
      <p class="stat-card__label">Cours terminés</p>
    </div>
    <div class="stat-card">
      <p class="stat-card__value">{debloques}</p>
      <p class="stat-card__label">Badges débloqués</p>
    </div>
  </div>

  <div class="dashboard__grid">

    <!-- ══════════════════════════════
         PANEL 1 — Cours en cours
    ══════════════════════════════ -->
    <div class="panel panel--wide">
      <div class="panel__head">
        <h2 class="panel__title">Mes cours en cours</h2>
        <span class="panel__count">{coursEnCours.length}</span>
      </div>

      <div class="panel__list">
        {#each coursEnCours as c}
          <div class="course-row">
            <div class="course-row__thumb course-row__thumb--{c.badge}"></div>
            <div class="course-row__body">
              <div class="course-row__top">
                <p class="course-row__title">{c.titre}</p>
                <span class="badge badge--cat badge--{c.badge}">{c.categorie}</span>
              </div>
              <div class="course-row__progress">
                <div class="progress-bar">
                  <div class="progress-bar__fill" style="width: {c.progression}%"></div>
                </div>
                <span class="progress-bar__label">{c.progression}%</span>
              </div>
            </div>
            <a href="/cours/{c.titre}" class="course-row__btn">Reprendre →</a>
          </div>
        {/each}

        {#if coursEnCours.length === 0}
          <p class="panel__empty">Aucun cours en cours.</p>
        {/if}
      </div>
    </div>

    <!-- ══════════════════════════════
         PANEL 2 — Mes succès / badges
    ══════════════════════════════ -->
    <div class="panel">
      <div class="panel__head">
        <h2 class="panel__title">Mes succès</h2>
        <span class="panel__count">{debloques}/{totalBadges}</span>
      </div>

      <!-- Barre de progression globale badges -->
      <div class="badge-progress">
        <div class="progress-bar">
          <div class="progress-bar__fill" style="width: {progressBadge}%"></div>
        </div>
        <span class="progress-bar__label">{debloques} badge{debloques > 1 ? 's' : ''} sur {totalBadges}</span>
      </div>

      <div class="badges-grid">
        {#each mesSucces as b}
          <div class="badge-item" class:badge-item--locked={!b.debloque}>
            <div class="badge-icon badge-icon--{b.couleur}" class:badge-icon--locked={!b.debloque}>
              {b.debloque ? b.icone : '🔒'}
            </div>
            <p class="badge-item__name">{b.nom}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- ══════════════════════════════
         PANEL 3 — Cours terminés
    ══════════════════════════════ -->
    <div class="panel panel--wide">
      <div class="panel__head">
        <h2 class="panel__title">Mes cours terminés</h2>
        <span class="panel__count">{coursTermines.length}</span>
      </div>

      <div class="panel__list">
        {#each coursTermines as c}
          <div class="list-row">
            <div class="list-row__check">✓</div>
            <div class="list-row__info">
              <p class="list-row__title">{c.titre}</p>
              <span class="badge badge--cat badge--{c.badge}">{c.categorie}</span>
            </div>
            <span class="list-row__date">Terminé le {c.dateTermine}</span>
          </div>
        {/each}

        {#if coursTermines.length === 0}
          <p class="panel__empty">Aucun cours terminé pour l'instant.</p>
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
    font-size: 11px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 100px;
    letter-spacing: 0.04em;
  }

  .dashboard__role-pill--student {
    background: var(--green-l);
    color: var(--green-d);
    border: 0.5px solid var(--green-m);
  }

  /* ── Stats ──────────────────────────────────────────────── */
  .stats {
    display: flex;
    gap: 14px;
    margin-bottom: 24px;
  }

  .stat-card {
    background: var(--white);
    border: 0.5px solid var(--border);
    border-radius: var(--r-lg);
    padding: 16px 20px;
    flex: 1;
  }

  .stat-card__value {
    font-family: 'DM Serif Display', serif;
    font-size: 28px;
    color: var(--blue);
    margin: 0 0 2px;
  }

  .stat-card__label {
    font-size: 12px;
    color: var(--gray);
    margin: 0;
  }

  /* ── Grid ───────────────────────────────────────────────── */
  .dashboard__grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    grid-template-rows: auto auto;
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
    min-width: 0;
    overflow: hidden;
  }

  .panel--wide {
    grid-column: 1 / 2;
  }

  .panel__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

  .panel__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .panel__empty {
    font-size: 13px;
    color: var(--gray);
    text-align: center;
    padding: 20px 0;
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
    gap: 8px;
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

  .course-row__btn {
    font-size: 11px;
    font-weight: 500;
    color: var(--blue);
    text-decoration: none;
    padding: 5px 10px;
    border-radius: var(--r-md);
    background: var(--blue-l);
    border: 0.5px solid var(--blue-m);
    flex-shrink: 0;
    transition: background 0.15s, color 0.15s;
  }

  .course-row__btn:hover {
    background: var(--blue);
    color: var(--white);
  }

  /* ── Progress bar ───────────────────────────────────────── */
  .progress-bar {
    flex: 1;
    height: 5px;
    background: var(--border);
    border-radius: 5px;
    overflow: hidden;
  }

  .progress-bar__fill {
    height: 100%;
    background: var(--blue);
    border-radius: 5px;
    transition: width 0.4s ease;
  }

  .progress-bar__label {
    font-size: 11px;
    color: var(--gray);
    flex-shrink: 0;
  }

  .course-row__progress {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .badge-progress {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* ── Badges grid ─────────────────────────────────────────── */
  .badges-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .badge-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    text-align: center;
  }

  .badge-item--locked {
    opacity: 0.4;
  }

  .badge-item__name {
    font-size: 11px;
    color: var(--gray);
    margin: 0;
    line-height: 1.3;
  }

  .badge-icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .badge-icon--amber       { background: var(--amber-l); border: 2px solid var(--amber); }
  .badge-icon--green       { background: var(--green-l); border: 2px solid var(--green); }
  .badge-icon--blue        { background: var(--blue-l);  border: 2px solid var(--blue);  }
  .badge-icon--locked      { background: #F5F5F4;        border: 2px solid #D6D3D1;      }

  /* ── List rows (cours terminés) ─────────────────────────── */
  .list-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: var(--r-md);
    background: var(--bg);
    border: 0.5px solid transparent;
    transition: border-color 0.15s, background 0.15s;
  }

  .list-row:hover {
    background: var(--green-l);
    border-color: var(--green-m);
  }

  .list-row__check {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--green-l);
    border: 1.5px solid var(--green);
    color: var(--green);
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .list-row__info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
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

    .stats {
      gap: 10px;
    }

    .stat-card {
      padding: 12px 14px;
    }

    .stat-card__value {
      font-size: 22px;
    }

    .dashboard__grid {
      grid-template-columns: 1fr;
    }

    .panel {
      min-width: 0;
      overflow: hidden;
    }

    .panel--wide {
      grid-column: 1 / -1;
    }

    .badges-grid {
      grid-template-columns: repeat(4, 1fr);
    }

    .course-row__btn {
      display: none;
    }
  }
</style>
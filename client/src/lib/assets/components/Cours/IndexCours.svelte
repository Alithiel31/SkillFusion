<script>
  const cours = {
    titre: 'Installer un robinet mitigeur',
    categorie: 'Plomberie',
    auteur: 'Marc Dupuis',
    difficulte: 'Débutant',
    difficulteNiveau: 2,
    resume: [
      "Dans ce cours, vous apprendrez à démonter un ancien robinet mitigeur et à installer un nouveau modèle. Nous verrons les différents types de raccordements, comment couper l'eau, préparer les arrivées et sécuriser l'installation avant la mise en service.",
      "Ce cours est adapté aux débutants complets. Aucune connaissance préalable en plomberie n'est nécessaire."
    ],
    resumeCourt: "Apprenez à démonter et installer un robinet mitigeur. Raccordements, coupure d'eau, mise en service.",
    objectifs: [
      "Couper l'arrivée d'eau en sécurité",
      'Démonter l\'ancien robinet',
      'Raccorder les flexibles',
      'Tester et contrôler les fuites'
    ],
    objectifsMobile: [
      "Couper l'arrivée d'eau",
      "Démonter l'ancien robinet",
      'Raccorder les flexibles'
    ],
    outils: 'Clé à molette · Téflon · Flexibles · Coupelle',
    avis: [
      {
        initiales: 'AL',
        nom: 'Antoine L.',
        note: 4.5,
        commentaire: "Très clair et bien expliqué, j'ai réussi du premier coup !"
      },
      {
        initiales: 'SM',
        nom: 'Sophie M.',
        note: 4,
        commentaire: 'Bon cours, peut-être un peu plus de photos serait utile.'
      }
    ]
  }

  function getStars(note) {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (note >= i) stars.push('full')
      else if (note >= i - 0.5) stars.push('half')
      else stars.push('empty')
    }
    return stars
  }
</script>

<!-- ===== DESKTOP VIEW ===== -->
<div class="desktop-view">
  <div class="desktop-header">
    <h1>{cours.titre}</h1>
    <div class="header-right">
      <span class="badge-categorie">{cours.categorie}</span>
      <span class="author">par <span>{cours.auteur}</span></span>
    </div>
  </div>

  <div class="desktop-main">
    <!-- LEFT -->
    <div class="left-col">
      <!-- Résumé -->
      <div class="card">
        <div class="card-title">Résumé du cours</div>
        {#each cours.resume as paragraphe}
          <p>{paragraphe}</p>
        {/each}
      </div>

      <!-- Avis -->
      <div class="card">
        <div class="reviews-title">Avis des apprenants</div>
        {#each cours.avis as avis, i}
          <div class="review-item" class:first={i === 0}>
            <div class="reviewer">
              <div class="avatar">{avis.initiales}</div>
              <div class="reviewer-info">
                <span class="reviewer-name">{avis.nom}</span>
                <div class="stars">
                  {#each getStars(avis.note) as type}
                    <span class="star-{type}">★</span>
                  {/each}
                </div>
              </div>
            </div>
            <div class="review-text">{avis.commentaire}</div>
          </div>
        {/each}
      </div>
    </div>

    <!-- RIGHT -->
    <div class="right-col">
      <div class="info-card">
        <!-- Difficulté -->
        <div class="info-section-title">DIFFICULTÉ</div>
        <div class="difficulty-row">
          <div class="diff-bars">
            {#each Array(5) as _, i}
              <div class="diff-bar {i < cours.difficulteNiveau ? 'filled' : 'empty'}"></div>
            {/each}
          </div>
          <span class="diff-label">{cours.difficulte}</span>
        </div>

        <!-- Objectifs -->
        <div class="info-section-title">OBJECTIFS PÉDAGOGIQUES</div>
        <ul class="obj-list">
          {#each cours.objectifs as obj}
            <li>{obj}</li>
          {/each}
        </ul>

        <!-- Outils -->
        <div class="info-section-title tools-title">OUTILS NÉCESSAIRES</div>
        <div class="tools-text">{cours.outils}</div>
      </div>

      <button class="cta-btn">Démarrer le cours →</button>
    </div>
  </div>
</div>

<!-- ===== MOBILE VIEW ===== -->
<div class="mobile-view">
  <div class="mobile-topbar">
    <div class="mobile-back">Tous les cours</div>
    <div class="mobile-header-row">
      <div class="mobile-title">{cours.titre}</div>
      <div class="mobile-header-right">
        <span class="mobile-badge">{cours.categorie}</span>
        <span class="mobile-author">{cours.auteur}</span>
      </div>
    </div>
  </div>

  <div class="mobile-body">
    <!-- Difficulté -->
    <div class="m-card">
      <div class="m-section-label">DIFFICULTÉ</div>
      <div class="m-difficulty-row">
        <div class="diff-bars">
          {#each Array(5) as _, i}
            <div class="diff-bar {i < cours.difficulteNiveau ? 'filled' : 'empty'}"></div>
          {/each}
        </div>
        <span class="diff-label">{cours.difficulte}</span>
      </div>
    </div>

    <!-- Résumé -->
    <div class="m-card">
      <div class="m-card-title">Résumé</div>
      <div class="m-resume-text">{cours.resumeCourt}</div>
    </div>

    <!-- Objectifs -->
    <div class="m-card">
      <div class="m-card-title-dark">Objectifs</div>
      <ul class="m-obj-list">
        {#each cours.objectifsMobile as obj}
          <li>{obj}</li>
        {/each}
      </ul>
    </div>
  </div>

  <div class="mobile-cta-wrap">
    <button class="mobile-cta-btn">Démarrer le cours →</button>
  </div>
</div>

<style>
  /* ===================== RESET ===================== */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ===================== DESKTOP ===================== */
  .desktop-view {
    display: block;
    background: #f3f0eaff;
    min-height: 100vh;
    padding: 32px 48px;
    font-family: 'Inter', sans-serif;
  }

  .desktop-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
  }

  .desktop-header h1 {
    font-size: 26px;
    font-weight: 700;
    color: #1a1a1a;
  }

  .header-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
  }

  .badge-categorie {
    border: 1.5px solid #1a1a1a;
    border-radius: 20px;
    padding: 3px 14px;
    font-size: 13px;
    font-weight: 500;
    color: #1a1a1a;
  }

  .author {
    font-size: 13px;
    color: #555;
  }

  .author span {
    font-weight: 600;
    color: #1a1a1a;
  }

  .desktop-main {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 24px;
  }

  /* Left column */
  .left-col {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .card {
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 12px;
    padding: 24px 28px;
  }

  .card-title {
    font-size: 15px;
    font-weight: 700;
    color: #e8a020;
    margin-bottom: 14px;
  }

  .card :global(p) {
    font-size: 14px;
    color: #333;
    line-height: 1.65;
  }

  .card p + p {
    margin-top: 12px;
  }

  /* Reviews */
  .reviews-title {
    font-size: 15px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 16px;
  }

  .review-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-bottom: 14px;
    border-top: 1px solid #f0f0f0;
    padding-top: 14px;
  }

  .review-item.first {
    border-top: none;
    padding-top: 0;
  }

  .reviewer {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #d0d0d0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
    color: #555;
    flex-shrink: 0;
  }

  .reviewer-info {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .reviewer-name {
    font-size: 13px;
    font-weight: 600;
    color: #1a1a1a;
  }

  .stars {
    display: flex;
    gap: 1px;
  }

  .star-full,
  .star-half {
    color: #f4a623;
    font-size: 13px;
  }

  .star-empty {
    color: #ddd;
    font-size: 13px;
  }

  .review-text {
    font-size: 13px;
    color: #555;
    margin-left: 42px;
  }

  /* Right column */
  .right-col {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .info-card {
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 12px;
    padding: 20px 22px;
  }

  .info-section-title {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 8px;
  }

  /* Difficulty bars */
  .difficulty-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
  }

  .diff-bars {
    display: flex;
    gap: 3px;
    align-items: flex-end;
  }

  .diff-bar {
    width: 5px;
    border-radius: 2px;
  }

  .diff-bar.filled {
    background: #3ab55b;
  }

  .diff-bar.empty {
    background: #d8d8d8;
  }

  .diff-bar:nth-child(1) { height: 8px; }
  .diff-bar:nth-child(2) { height: 12px; }
  .diff-bar:nth-child(3) { height: 16px; }
  .diff-bar:nth-child(4) { height: 16px; }
  .diff-bar:nth-child(5) { height: 16px; }

  .diff-label {
    font-size: 13px;
    font-weight: 600;
    color: #1a1a1a;
  }

  /* Objectives */
  .obj-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 4px;
  }

  .obj-list li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 13px;
    color: #1a1a1a;
  }

  .obj-list li::before {
    content: '✓';
    color: #3ab55b;
    font-weight: 700;
    font-size: 13px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  /* Tools */
  .tools-title {
    margin-top: 18px;
  }

  .tools-text {
    font-size: 13px;
    color: #1a1a1a;
  }

  /* CTA */
  .cta-btn {
    background: #f4a623;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 16px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    text-align: center;
    display: block;
    font-family: inherit;
  }

  /* ===================== MOBILE ===================== */
  .mobile-view {
    display: none;
    background-color: #f3f0ea;
  }

  @media (max-width: 640px) {
    .desktop-view {
      display: none;
    }

    .mobile-view {
      display: block;
      background: #f5f5f5;
      min-height: 100vh;
      padding: 0 0 24px;
      font-family: 'Inter', sans-serif;
    }
  }

  .mobile-topbar {
    background: #fff;
    padding: 14px 16px 0;
  }

  .mobile-back {
    font-size: 13px;
    color: #555;
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .mobile-back::before {
    content: '←';
    font-size: 14px;
  }

  .mobile-header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 14px;
  }

  .mobile-title {
    font-size: 20px;
    font-weight: 700;
    color: #1a1a1a;
    max-width: 210px;
    line-height: 1.25;
  }

  .mobile-header-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 3px;
  }

  .mobile-badge {
    border: 1.5px solid #1a1a1a;
    border-radius: 20px;
    padding: 2px 12px;
    font-size: 12px;
    font-weight: 500;
    color: #1a1a1a;
  }

  .mobile-author {
    font-size: 12px;
    color: #555;
  }

  .mobile-body {
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .m-card {
    background: #fff;
    border-radius: 12px;
    padding: 16px 18px;
  }

  .m-section-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 8px;
  }

  .m-difficulty-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .m-card-title {
    font-size: 14px;
    font-weight: 700;
    color: #e8a020;
    margin-bottom: 8px;
  }

  .m-resume-text {
    font-size: 13px;
    color: #444;
    line-height: 1.55;
  }

  .m-card-title-dark {
    font-size: 14px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 10px;
  }

  .m-obj-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .m-obj-list li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 13px;
    color: #1a1a1a;
  }

  .m-obj-list li::before {
    content: '✓';
    color: #3ab55b;
    font-weight: 700;
    font-size: 13px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .mobile-cta-wrap {
    padding: 0 14px;
    margin-top: 4px;
  }

  .mobile-cta-btn {
    background: #f4a623;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 15px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    text-align: center;
    display: block;
    font-family: inherit;
  }
</style>
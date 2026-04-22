<script>
  const cours = {
    titre: 'Installer un robinet mitigeur',
    categorie: 'Plomberie',
    auteur: 'Marc Dupuis',
    difficulte: 'Débutant',
    difficulteNiveau: 2, // barres remplies sur 5
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
<script>
import logoSkillFusion from '$lib/assets/img/testlogo.png';
</script>

<header class="header">
  <div class="header__inner">
    <!-- Logo du site  -->
    <a class="logo_site" href="/"> <img src={logoSkillFusion} alt="SkillFusion" /></a>
    <!-- Navigation -->
    <nav class="header__nav" aria-label="Navigation principale">
      <a
        href="/cours"
        class="header__nav-link"
      >
        Nos cours
      </a>
      <a
        href="/tableau-de-bord"
        class="header__nav-link"
      >
        Tableau de bord
      </a>
    </nav>
    <!-- Bouton de connxion/d'inscription -->
    <div class="header__actions">
      <a href="/connexion" class="header__btn-login">Connexion</a>
      <a href="/inscription" class="header__btn-register">S'inscrire</a>
    </div>


  </div>
</header>

<style>
  .header {
    --blue: #1D4E89;
    --blue-light: #EBF2FA;
    --amber: #F5A623;
    --dark: #2C3E50;
    --gray: #6B7280;
    --border: rgba(44, 62, 80, 0.1);
    --white: #ffffff;
    --radius: 10px;
    --font: 'DM Sans', sans-serif;
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--white);
    border-bottom: 1px solid var(--border);
    font-family: var(--font);
  }
img{
        width: 40px;
}
  .header__inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px;
    height: 64px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    }
  /* ── Nav desktop ── */
  .header__nav {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 1;
    order: 1;
    justify-content: center;
  }

  .header__nav-link {
    padding: 8px 16px;
    border-radius: var(--radius);
    font-size: 14px;
    font-weight: 500;
    color: var(--dark);
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
  }

  .header__nav-link:hover {
    background: var(--blue-light);
    color: var(--blue);
  }


  /* ── Actions desktop ── */
  .header__actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .header__btn-login {
    padding: 8px 18px;
    border-radius: var(--radius);
    font-size: 14px;
    font-weight: 500;
    color: var(--blue);
    text-decoration: none;
    border: 1.5px solid var(--blue);
    background: transparent;
    transition: background 0.15s, color 0.15s;
    white-space: nowrap;
  }

  .header__btn-login:hover {
    background: var(--blue-light);
  }

  .header__btn-register {
    padding: 8px 18px;
    border-radius: var(--radius);
    font-size: 14px;
    font-weight: 500;
    color: var(--white);
    text-decoration: none;
    background: var(--amber);
    border: none;
    transition: opacity 0.15s;
    white-space: nowrap;
  }

  .header__btn-register:hover {
    opacity: 0.88;
  }

  /* ── Responsive ── */
  @media (min-width: 768px) {
    .header__inner {
      order: 0;
    }
  }
</style>

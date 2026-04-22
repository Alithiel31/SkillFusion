<script>
	// --- DONNÉES ---
	const categories = [
		'Toutes les catégories',
		'Plomberie',
		'Électricité',
		'Menuiserie',
		'Chauffage',
		'Carrelage',
		'Peinture'
	];

	const allCourses = [
		{
			id: 1,
			category: 'Plomberie',
			title: 'Installer un robinet mitigeur',
			subtitle: 'Démontage et raccordement.',
			level: 'Débutant'
		},
		{
			id: 2,
			category: 'Électricité',
			title: 'Poser une prise électrique',
			subtitle: 'Câblage et mise à la terre.',
			level: 'Intermédiaire'
		},
		{
			id: 3,
			category: 'Menuiserie',
			title: 'Poser un parquet flottant',
			subtitle: 'Préparation et pose clipsée.',
			level: 'Facile'
		},
		{
			id: 4,
			category: 'Chauffage',
			title: 'Purger un radiateur',
			subtitle: 'Entretien annuel et optimisation.',
			level: 'Facile'
		},
		{
			id: 5,
			category: 'Carrelage',
			title: 'Poser du carrelage mural',
			subtitle: 'Jointoiement et découpe.',
			level: 'Intermédiaire'
		},
		{
			id: 6,
			category: 'Peinture',
			title: 'Peindre une pièce entière',
			subtitle: 'Préparation, sous-couche, finition.',
			level: 'Débutant'
		},
		{
			id: 7,
			category: 'Plomberie',
			title: 'Réparer une fuite sous évier',
			subtitle: 'Diagnostic et remplacement du joint.',
			level: 'Difficile'
		},
		{
			id: 8,
			category: 'Électricité',
			title: 'Créer un tableau électrique',
			subtitle: 'Dimensionnement et câblage.',
			level: 'Expert'
		},
		{
			id: 9,
			category: 'Menuiserie',
			title: 'Poser un auvent en bois',
			subtitle: 'Mesurage et montage.',
			level: 'Intermédiaire'
		}
	];

	const categoryColors = {
		Plomberie: { border: '#3b82f6', text: '#1d4ed8' },
		Électricité: { border: '#f59e0b', text: '#b45309' },
		Menuiserie: { border: '#22c55e', text: '#15803d' },
		Chauffage: { border: '#a855f7', text: '#7e22ce' },
		Carrelage: { border: '#ef4444', text: '#b91c1c' },
		Peinture: { border: '#6b7280', text: '#374151' }
	};

	const cardColors = {
		Plomberie: '#1e40af',
		Électricité: '#92400e',
		Menuiserie: '#14532d',
		Chauffage: '#6b21a8',
		Carrelage: '#991b1b',
		Peinture: '#374151'
	};

	const levels = {
		Débutant: { color: '#4ade80', bars: [true, false, false, false, false] },
		Facile: { color: '#4ade80', bars: [true, true, false, false, false] },
		Intermédiaire: { color: '#f59e0b', bars: [true, true, true, false, false] },
		Difficile: { color: '#ef4444', bars: [true, true, true, true, false] },
		Expert: { color: '#ef4444', bars: [true, true, true, true, true] }
	};

	const icons = {
		Plomberie: 'A',
		Électricité: '↕',
		Menuiserie: '⊠',
		Chauffage: '♟',
		Carrelage: '⊞',
		Peinture: '⊟'
	};

	// --- ÉTAT (Svelte 5 : $state) ---
	let searchQuery = $state('');
	let selectedCategory = $state('Toutes les catégories');
	let showCount = $state(8);
	let showDropdown = $state(false);

	// --- DÉRIVÉ (Svelte 5 : $derived) ---
	let filteredCourses = $derived(
		allCourses.filter((c) => {
			const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());

			const matchCat =
				selectedCategory === 'Toutes les catégories' || c.category === selectedCategory;

			return matchSearch && matchCat;
		})
	);

	let visibleCourses = $derived(filteredCourses.slice(0, showCount));

	let hasMore = $derived(filteredCourses.length > showCount);

	// --- FONCTIONS ---
	function selectCategory(cat) {
		selectedCategory = cat;
		showDropdown = false;
		showCount = 8;
	}

	function loadMore() {
		showCount += 4;
	}
</script>

<div class="page">
	<main class="main">
		<h1 class="page-title">Tous les cours</h1>

		<!-- Recherche & Filtre -->
		<div class="search">
			<input
				class="search-input"
				type="text"
				placeholder="Rechercher un cours..."
				bind:value={searchQuery}
			/>

			<div class="dropdown-wrapper">
				<select
					id="categorie-select"
					class="category-btn"
					onclick={() => (showDropdown = !showDropdown)}
				>
					{selectedCategory}
					<span class="chevron">▾</span>
					{#each categories as cat}
						<option value="${cat}">
							{cat}
						</option>
					{/each}
				</select>
			</div>

			<button type="button" class="add-btn">+</button>
		</div>

		<!-- Grille de cours -->
		<div class="courses-grid">
			{#each visibleCourses as course (course.id)}
				{@const catColor = categoryColors[course.category] ?? { border: '#999', text: '#555' }}
				{@const cardColor = cardColors[course.category] ?? '#555'}
				{@const levelInfo = levels[course.level]}

				<div class="course-card">
					<div class="card-image" style="background-color: {cardColor};">
						<div class="card-icon">{icons[course.category] ?? '?'}</div>
					</div>
					<div class="card-body">
						<span
							class="category-badge"
							style="border-color: {catColor.border}; color: {catColor.text};"
						>
							{course.category}
						</span>
						<h3 class="card-title">{course.title}</h3>
						<p class="card-subtitle">{course.subtitle}</p>
						<div class="level-row">
							<div class="bars">
								{#each [0, 1, 2, 3] as i}
									<div
										class="bar"
										style="background-color: {levelInfo.bars[i]
											? levelInfo.color
											: '#e5e7eb'}; height: {8 + i * 3}px;"
									></div>
								{/each}
							</div>
							<span class="level-label" style="color: {levelInfo.color};">{course.level}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>

		{#if hasMore}
			<div class="load-more-wrapper">
				<button class="load-more-btn" onclick={loadMore}>Charger plus de cours</button>
			</div>
		{/if}
	</main>
</div>

<style>
	:global(*, *::before, *::after) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
		background-color: #f3f0ea;
		color: #1a1a1a;
	}

	.page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #f3f0ea;
	}

	.main {
		flex: 1;
		max-width: 1120px;
		width: 100%;
		margin: 0 auto;
		padding: 2.5rem 1.5rem 3rem;
	}

	.page-title {
		text-align: center;
		font-size: 2rem;
		font-weight: 700;
		color: #1e3a5f;
		margin-bottom: 1.5rem;
		letter-spacing: -0.02em;
	}

	/* Recherche */
	.search {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		margin-bottom: 2rem;
	}

	.search-input {
		flex: 1;
		padding: 0.65rem 1rem;
		border: 1px solid #ddd;
		border-radius: 8px;
		font-size: 0.9rem;
		background: white;
		outline: none;
		color: #374151;
		transition: border-color 0.15s;
	}

	.search-input:focus {
		border-color: #1d4ed8;
	}

	.search-input::placeholder {
		color: #9ca3af;
	}

	.dropdown-wrapper {
		position: relative;
		overflow: visible;
	}

	.category-btn {
		padding: 0.65rem 1rem;
		border: 1px solid #ddd;
		border-radius: 8px;
		background: white;
		font-size: 0.9rem;
		cursor: pointer;
		color: #374151;
		white-space: nowrap;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		transition: border-color 0.15s;
	}

	.category-btn:hover {
		border-color: #9ca3af;
	}

	.chevron {
		font-size: 0.8rem;
		color: #6b7280;
	}

	.dropdown {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		right: 0;
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		z-index: 999;
		list-style: none;
		overflow: hidden;
	}

	.dropdown-item {
		width: 100%;
		text-align: left;
		padding: 0.6rem 1rem;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 0.9rem;
		color: #374151;
		transition: background 0.1s;
	}

	.dropdown-item:hover {
		background: #f3f4f6;
	}

	.add-btn {
		width: 40px;
		height: 40px;
		border-radius: 8px;
		background: #1e3a5f;
		color: white;
		border: none;
		font-size: 1.3rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: background 0.15s;
	}

	.add-btn:hover {
		background: #1d4ed8;
	}

	/* Grille */
	.courses-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.25rem;
	}

	@media (max-width: 1024px) {
		.courses-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 600px) {
		.courses-grid {
			grid-template-columns: 1fr;
		}
	}

    /* --- mobile view --- */
	@media (max-width: 768px) {
		.main {
			max-width: 100%;
			padding: 1rem;
		}

		.page-title {
			font-size: 1.4rem;
			text-align: left;
		}

		.search {
			flex-direction: column;
			align-items: stretch;
		}

		.category-btn {
			width: 100%;
		}

		.add-btn {
			display: none;
		}

		.category-btn {
			width: 100%;
		}

        .search {
            flex-direction: row;
        }

		/* TRANSFORMATION GRID → LISTE MOBILE */
		.courses-grid {
			display: flex;
			flex-direction: column;
			gap: 0.8rem;
		}

		/* CARD STYLE MOBILE */
		.course-card {
			display: flex;
			align-items: center;
			gap: 0;
			padding: 0;
		}

		.card-image {
			width: 0px;
			height: 0px;
			border-radius: 0px;
		}

		.card-body {
			flex: 1;
		}

		.card-title {
			font-size: 0.95rem;
			text-align: center;
		}

		.card-subtitle {
			font-size: 0.75rem;
		}

		.level-row {
			justify-content: space-between;
		}

		.card-subtitle {
			display: none;
		}

		.bars {
			display: none;
			width: 0;
			height: 0;
		}
	}

	.course-card {
		background: white;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		cursor: pointer;
	}

	.course-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
	}

	.card-image {
		height: 130px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card-icon {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.3rem;
		color: rgba(255, 255, 255, 0.85);
	}

	.card-body {
		padding: 0.85rem 1rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.category-badge {
		display: inline-block;
		width: fit-content;
		padding: 0.15rem 0.6rem;
		border: 1px solid;
		border-radius: 20px;
		font-size: 0.75rem;
		font-weight: 500;
	}

	.card-title {
		font-size: 0.95rem;
		font-weight: 600;
		color: #111827;
		line-height: 1.35;
		margin-top: 0.15rem;
	}

	.card-subtitle {
		font-size: 0.8rem;
		color: #6b7280;
		line-height: 1.4;
	}

	.level-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.3rem;
	}

	.bars {
		display: flex;
		align-items: flex-end;
		gap: 2px;
	}

	.bar {
		width: 5px;
		border-radius: 2px;
	}

	.level-label {
		font-size: 0.8rem;
		font-weight: 500;
	}

	.load-more-wrapper {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
	}

	.load-more-btn {
		padding: 0.6rem 1.5rem;
		border: 1px solid #d1d5db;
		border-radius: 10px;
		background: white;
		font-size: 0.9rem;
		color: #374151;
		cursor: pointer;
		transition:
			background 0.15s,
			border-color 0.15s;
		border: #1e3a5f solid 1px;
	}

	.load-more-btn:hover {
		background: #1e3a5f;
		color: white;
		border-color: white;
	}
</style>

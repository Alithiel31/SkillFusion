<script lang="ts">
	import App from '$lib/assets/components/App.svelte';
	import Footer from '$lib/assets/components/Footer.svelte';
	import Header from '$lib/assets/components/Header.svelte';
	import Main from '$lib/assets/components/Main.svelte';
	import CoursCard from '$lib/assets/components/Cours/CoursCard.svelte';
	import api from '$lib/services/api.service';
	import { onMount } from 'svelte';
	import type { ICours, ICategory } from '$lib/@types/types';

	let courses: ICours[] = $state([]);
	let categories: ICategory[] = $state([]);

	onMount(async () => {
		const categoriesResponse = await api('api/categories');
		categories = categoriesResponse.data;
		const coursesResponse = await api('api/cours');
		courses = coursesResponse.data;
		console.log(courses);
	});
	let searchQuery = $state('');
	let selectedCategory = $state('Toutes les catégories');

	let filteredCourses = $derived(
		courses
			.filter(
				(cours) =>
					selectedCategory === 'Toutes les catégories' || cours.category.name == selectedCategory
			)
			.filter((cours) => cours.title.toLowerCase().includes(searchQuery.toLowerCase()))
	);
</script>

<App>
	<Header />
	<Main>
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
				<select id="categorie-select" class="category-btn" bind:value={selectedCategory}>
					<option value="Toutes les catégories"> Toutes les catégories </option>
					{#each categories as category}
						<option value={category.name}>
							{category.name}
						</option>
					{/each}
				</select>
			</div>

			<button type="button" class="add-btn">+</button>
		</div>
		<div class="courses-grid">
			{#each filteredCourses as cours (cours.id)}
				<CoursCard
					{cours}
					--card__image__color={cours.category.textColor}
					--border_color={cours.category.borderColor}
					--text_color={cours.category.textColor}
				/>
			{/each}
		</div>
	</Main>
	<Footer />
</App>

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
		grid-template-columns: repeat(1, 1fr);
		gap: 1.25rem;
	}

	/* --- mobile view --- */
	@media (min-width: 768px) {
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

		.courses-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.courses-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>

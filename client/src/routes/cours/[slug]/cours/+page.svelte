<script lang="ts">
	import Header from '$lib/assets/components/Header.svelte';
	import Footer from '$lib/assets/components/Footer.svelte';
	import App from '$lib/assets/components/App.svelte';
	import Main from '$lib/assets/components/Main.svelte';
	import '../../../../app.css';
	import api from '$lib/services/api.service';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import type { ICours } from '$lib/@types/types';
	import Category from '$lib/assets/components/Category/Category.svelte';

	let isLoading = $state(false);
	let cours: ICours | null = $state(null);
	let currentPage: number = $state(1);
	let coursContent = $state(null);

	onMount(async () => {
		isLoading = true;
		const response = await api('api/cours?slug=' + page.params.slug, 'GET');
		cours = response.data;
		if (cours) {
			const currentPageId = cours.content.find((content) => content.numberPage == currentPage);
			const response = await api('api/cours-contents/' + currentPageId?.id, 'GET');
			coursContent = response.data;
			isLoading = false;
		}
	});

	async function getCours() {
		const currentPageId = cours?.content.find((content) => content.numberPage == currentPage);
		const response = await api('api/cours-contents/' + currentPageId?.id, 'GET');
		coursContent = response.data;
	}

	function goToPrevious() {
		if (currentPage > 1) {
			currentPage--;
			getCours();
		}
	}

	function goToNext() {
		if (currentPage < cours.numberPage) {
			currentPage++;
			getCours();
		}
	}
</script>

<App>
	<Header />
	<Main class="main-cours">
		{#if isLoading}
			<p>Données en cours de chargement...</p>
		{/if}
		{#if cours && coursContent}
			<div class="cours_header">
				<h1>{cours.title}</h1>
				<div class="header-right">
					<Category
						category={cours.category}
						--border_color={cours.category.borderColor}
						--text_color={cours.category.textColor}
					/>
					<span class="author">par <span>{cours.author.pseudo}</span></span>
				</div>
			</div>

			<div class="cours-main">
				<div class="card-title">Contenu du cours</div>
				<div class="cours-content">
					<p>{coursContent.content}</p>
				</div>
			</div>

			<div class="navigation-footer">
				<button class="nav-btn prev-btn" disabled={currentPage === 1} onclick={goToPrevious}
					>← Précédent</button
				>
				<span class="page-indicator">Page {currentPage} sur {cours?.numberPage}</span>
				<button
					class="nav-btn next-btn"
					disabled={currentPage === cours?.numberPage}
					onclick={goToNext}
				>
					Suivant →
				</button>
			</div>

			<div class="card">
				<div class="reviews-title">Commentaires et avis</div>
			</div>
		{/if}
	</Main>
	<Footer />
</App>

<style>
	.cours_header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 10px;
		margin-bottom: 40px;
		background-color: var(--background-white);
	}

	.header-right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 4px;
	}

	.author {
		font-size: 13px;
		color: #555;
	}

	.author span {
		font-weight: 600;
		color: #1a1a1a;
	}

	.cours-main {
		margin-bottom: 40px;
		margin-left: 20px;
		margin-right: 20px;
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

	.cours-content {
		font-size: 14px;
		color: #333;
		line-height: 1.65;
	}

	/* Reviews */
	.reviews-title {
		font-size: 15px;
		font-weight: 700;
		color: #1a1a1a;
		margin-bottom: 16px;
	}

	/* NAVIGATION FOOTER */
	.navigation-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
		padding: 24px;
		background: #fff;
		border: 1px solid #e8e8e8;
		border-radius: 12px;
		margin-top: 40px;
		margin-left: 20px;
		margin-right: 20px;
	}

	.nav-btn {
		background: #f4a623;
		color: #fff;
		border: none;
		border-radius: 8px;
		padding: 12px 20px;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		font-family: inherit;
		transition: background 0.2s;
		flex: 1;
	}

	.nav-btn:hover:not(:disabled) {
		background: #e89b1c;
	}

	.nav-btn:disabled {
		background: #d0d0d0;
		cursor: not-allowed;
		color: #999;
	}

	.page-indicator {
		font-size: 14px;
		font-weight: 600;
		color: #1a1a1a;
		text-align: center;
		flex: 1;
	}
</style>

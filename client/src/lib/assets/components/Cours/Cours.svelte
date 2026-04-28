<script lang="ts">
	import '../../../../app.css';
	import api from '$lib/services/api.service';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import type { ICours } from '$lib/@types/types';
	import Category from '$lib/assets/components/Category/Category.svelte';
	import LevelBar from '$lib/assets/components/Levelbar/LevelBar.svelte';

	let cours: ICours | null = $state(null);
	let currentPage: number = $state(1);
	let indexCours: ICours|null = $state(null);

	onMount(async () => {
		// Fetch tous les cours ou une liste paginée
		const response = await api('api/cours?slug=' + page.params.slug, 'GET');
		indexCours = response.data;
		
		// Récupérer le cours selon le paramètre page
		const pageNum = parseInt(page.params.page) || 1;
		currentPage = Math.max(1, Math.min(pageNum, indexCours?.numberPage));
	});



	function goToPrevious() {
		if (currentPage > 1) {
			const newPage = currentPage - 1;
			window.location.href = `/cours/${newPage}`;
		}
	}

	function goToNext() {
		if (currentPage < indexCours?.numberPage) {
			const newPage = currentPage + 1;
			window.location.href = `/cours/${newPage}`;
		}
	}
</script>

{#if indexCours}
	<div class="desktop-view">
		<!-- HEADER -->
		<div class="desktop-header">
			<h1>{indexCours.title}</h1>
			<div class="header-right">
				<Category
				category={indexCours.category}
				--border_color={indexCours.category.borderColor}
				--text_color={indexCours.category.textColor}
				--background-color={indexCours.category.backgroundColor}/>
				<span class="author">par <span>{indexCours.author.pseudo}</span></span>
			</div>
		</div>

		<!-- MAIN CONTENT -->
		<div class="desktop-main">
			<!-- LEFT COLUMN -->
			<div class="left-col">
				<!-- COURS SECTION -->
				<div class="card">
					<div class="card-title">Contenu du cours</div>
					<div class="cours-content">
						<p>{indexCours.littleSummary}</p>
					</div>
				</div>

				<!-- COMMENTAIRES SECTION -->
				<div class="card">
					<div class="reviews-title">Commentaires et avis</div>
					
				</div>
			</div>

			<!-- RIGHT COLUMN - STRUCTURE ÉDUCATIVE -->
			<div class="right-col">
				<div class="info-card">
					<div class="info-section-title">STRUCTURE ÉDUCATIVE</div>

					<!-- Difficulté -->
					<div class="edu-section">
						<div class="edu-label">Niveau de difficulté</div>
						<LevelBar level={indexCours.difficulty} />
					</div>

					<!-- Objectifs pédagogiques -->
					<div class="edu-section">
						<div class="edu-label">Objectifs pédagogiques</div>
						<ul class="obj-list">
							{#each indexCours.learningObjectives as obj}
								<li>{obj.objectif.title}</li>
							{/each}
						</ul>
					</div>

					<!-- Outils nécessaires -->
					<div class="edu-section">
						<div class="edu-label">Outils nécessaires</div>
						<ul class="obj-list">
							{#each indexCours.tools as tool}
								<li>{tool.tools.name}</li>
							{/each}
						</ul>
					</div>

					<!-- Catégorie -->
					<div class="edu-section">
						<div class="edu-label">Catégorie</div>
						<p class="edu-value">{indexCours.category.name}</p>
					</div>

					<!-- Auteur -->
					<div class="edu-section">
						<div class="edu-label">Auteur</div>
						<p class="edu-value">{indexCours.author.pseudo}</p>
					</div>
				</div>
			</div>
		</div>

		<!-- NAVIGATION BUTTONS -->
		<div class="navigation-footer">
			<button 
				class="nav-btn prev-btn" 
				disabled={currentPage === 1}
				onclick={goToPrevious}
			>
				← Précédent
			</button>
			<span class="page-indicator">Page {currentPage} sur {indexCours?.numberPage}</span>
			<button 
				class="nav-btn next-btn" 
				disabled={currentPage === indexCours?.numberPage}
				onclick={goToNext}
			>
				Suivant →
			</button>
		</div>
	</div>

	
{/if}

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
		background: var(--background-color);
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
		margin-bottom: 40px;
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
		color: #e8a020;
		margin-bottom: 18px;
		border-bottom: 2px solid #e8a020;
		padding-bottom: 12px;
	}

	.edu-section {
		margin-bottom: 18px;
	}

	.edu-label {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: #888;
		margin-bottom: 6px;
	}

	.edu-value {
		font-size: 13px;
		color: #1a1a1a;
		font-weight: 500;
	}

	/* Difficulty bars */
	.difficulty-row {
		display: flex;
		align-items: center;
		gap: 8px;
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

	.diff-bar:nth-child(1) {
		height: 8px;
	}
	.diff-bar:nth-child(2) {
		height: 12px;
	}
	.diff-bar:nth-child(3) {
		height: 16px;
	}
	.diff-bar:nth-child(4) {
		height: 16px;
	}
	.diff-bar:nth-child(5) {
		height: 16px;
	}

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

	/* ===================== MOBILE ===================== */

	@media (max-width: 768px) {


	}

</style>

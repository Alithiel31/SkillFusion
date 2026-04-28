<script lang="ts">
	import api from '$lib/services/api.service';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import type { ICours } from '$lib/@types/types';

	let course: ICours | null = $state(null);
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
				<span class="badge-categorie">{indexCours.category.name}</span>
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
						<div class="difficulty-row">
							<div class="diff-bars">
								{#each Array(5) as _, i}
									<div class="diff-bar {i < indexCours.difficulty ? 'filled' : 'empty'}"></div>
								{/each}
							</div>
							<span class="diff-label">{indexCours.difficulty}/5</span>
						</div>
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

	<!-- MOBILE VIEW -->
	<div class="mobile-view">
		<div class="mobile-topbar">
			<div class="mobile-back">Tous les cours</div>
			<div class="mobile-header-row">
				<div class="mobile-title">{indexCours?.title}</div>
				<div class="mobile-header-right">
					<span class="mobile-badge">{indexCours?.category.name}</span>
					<span class="mobile-author">{indexCours?.author.pseudo}</span>
				</div>
			</div>
		</div>

		<div class="mobile-body">
			<!-- Contenu du cours -->
			<div class="m-card">
				<div class="m-card-title">Contenu</div>
				<div class="m-resume-text">{indexCours?.littleSummary}</div>
			</div>

			<!-- Difficulté -->
			<div class="m-card">
				<div class="m-section-label">Niveau de difficulté</div>
				<div class="m-difficulty-row">
					<div class="diff-bars">
						{#each Array(5) as _, i}
							<div class="diff-bar {i < indexCours?.difficulty ? 'filled' : 'empty'}"></div>
						{/each}
					</div>
					<span class="diff-label">{indexCours?.difficulty}/5</span>
				</div>
			</div>

			<!-- Objectifs -->
			<div class="m-card">
				<div class="m-card-title-dark">Objectifs pédagogiques</div>
				<ul class="m-obj-list">
					{#each indexCours?.learningObjectives as obj}
						<li>{obj.objectif.title}</li>
					{/each}
				</ul>
			</div>

			<!-- Commentaires -->
			<div class="m-card">
				<div class="m-card-title-dark">Commentaires</div>
				{#if indexCours?.opinions && indexCours?.opinions.length > 0}
					{#each indexCours?.opinions.slice(0, 3) as opinion, i}
						<div class="m-review-item" class:first={i === 0}>
							<div class="m-reviewer">
								<div class="m-avatar"></div>
								<span class="m-reviewer-name">{opinion.user.pseudo}</span>
							</div>
							<div class="m-review-text">{opinion.content}</div>
						</div>
					{/each}
				{:else}
					<p class="m-no-comments">Aucun commentaire</p>
				{/if}
			</div>

			<!-- Navigation -->
			<div class="m-navigation">
				<button 
					class="m-nav-btn" 
					disabled={currentPage === 1}
					onclick={goToPrevious}
				>
					← Précédent
				</button>
				<span class="m-page-indicator">{currentPage}/{indexCours?.numberPage}</span>
				<button 
					class="m-nav-btn" 
					disabled={currentPage === indexCours?.numberPage}
					onclick={goToNext}
				>
					Suivant →
				</button>
			</div>
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
	.mobile-view {
		display: none;
		background-color: #f3f0ea;
	}

	@media (max-width: 768px) {
		.desktop-view {
			display: none;
		}

		.mobile-view {
			display: block;
			background: #f3f0ea;
			min-height: 100vh;
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

	.m-review-item {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 10px 0;
		border-top: 1px solid #f0f0f0;
	}

	.m-review-item.first {
		border-top: none;
		padding-top: 0;
	}

	.m-reviewer {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.m-avatar {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: #d0d0d0;
		flex-shrink: 0;
	}

	.m-reviewer-name {
		font-size: 12px;
		font-weight: 600;
		color: #1a1a1a;
	}

	.m-review-text {
		font-size: 12px;
		color: #555;
		margin-left: 36px;
	}

	.m-no-comments {
		font-size: 13px;
		color: #999;
		font-style: italic;
	}

	.m-navigation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
		padding: 16px 0;
		margin-top: 10px;
	}

	.m-nav-btn {
		background: #f4a623;
		color: #fff;
		border: none;
		border-radius: 8px;
		padding: 10px 12px;
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		font-family: inherit;
		flex: 1;
		transition: background 0.2s;
	}

	.m-nav-btn:hover:not(:disabled) {
		background: #e89b1c;
	}

	.m-nav-btn:disabled {
		background: #d0d0d0;
		cursor: not-allowed;
		color: #999;
	}

	.m-page-indicator {
		font-size: 12px;
		font-weight: 600;
		color: #1a1a1a;
		flex: 1;
		text-align: center;
	}

</style>

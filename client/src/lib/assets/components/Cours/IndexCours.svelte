<script lang="ts">
	import '../../../../app.css';
	import api from '$lib/services/api.service';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import type { ICours } from '$lib/@types/types';
	import LevelBar from '$lib/assets/components/Levelbar/LevelBar.svelte';
	import Category from '$lib/assets/components/Category/Category.svelte';
	import ModalOpinion from '../Validator/ModalOpinion.svelte';

	import { authStore, getAuth } from '$lib/services/localstorage.service.svelte';
	import ModalValidator from '../Validator/ModalValidator.svelte';
	import type { IModal } from '$lib/@types/html';

	let cours: ICours | null = $state(null);
	let visibility = $derived(cours?.visibility);
	let alreadyOpinion = $state({ IsOpinionExisting: false, opinion: { note: 0 } });

	onMount(async () => {
		getAuth();
		const response = await api('api/cours?slug=' + page.params.slug);
		cours = response.data;
		AlreadyHaveNoted();
	});
	async function AlreadyHaveNoted() {
		const response = await api('api/opinions/' + cours?.id + '/user/' + authStore.user?.id, 'GET');
		alreadyOpinion = response.data;
	}

	async function patchOpinions(note: number, content: string) {
		const response = await api('api/opinions/' + cours?.id + '/user/' + authStore.user?.id, 'GET');
		const data = { content: content, note: note, coursId: cours?.id, userId: authStore?.user?.id };
		await api('api/opinions/' + response.data.opinion.id, 'PATCH', data);
		closeDeleteOpinionModale();
		const refresh = await api('api/cours?slug=' + page.params.slug);
		cours = refresh.data;
	}

	async function addCoursActiveToStudent() {
		const data = { userId: authStore?.user?.id, coursId: cours?.id, IsEnd: false };
		await api('api/cours-active ', 'POST', data);
	}

	function getStars(note: number) {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			if (note >= i) stars.push('full');
			else if (note >= i - 0.5) stars.push('half');
			else stars.push('empty');
		}
		return stars;
	}
	function modalAddOpinion() {
		const modal = document.getElementById('ModalOpinion') as IModal;
		modal.show();
	}
	function closeDeleteOpinionModale() {
		const modal = document.getElementById('ModalOpinion') as IModal;
		modal.close();
	}
	async function ValidateDataModal(note: number, content: string) {
		const data = { content: content, note: note, coursId: cours?.id, userId: authStore?.user?.id };
		await api('api/opinions', 'POST', data);
		closeDeleteOpinionModale();
		const refresh = await api('api/cours?slug=' + page.params.slug);
		cours = refresh.data;
		const response = await api('api/opinions/' + cours?.id + '/user/' + authStore.user?.id, 'GET');
		alreadyOpinion = response.data;
	}

	function modalDeleteCours() {
		const modal = document.getElementById('ModalValidator') as IModal;
		modal.show();
	}

	function closeDeleteCoursModale() {
		const modal = document.getElementById('ModalValidator') as IModal;
		modal.close();
	}
	async function deleteCours() {
		const response = await api('api/cours/' + cours?.id, 'DELETE');
		closeDeleteCoursModale();
	}
	async function changeVisibility() {
		await api('api/cours/' + cours?.id + '/visibility', 'POST');
		const response = await api('api/cours?slug=' + page.params.slug);
		cours = response.data;
	}
</script>

<div class="back-cours">
	<a href="/cours" class="back-link">← Tous les cours</a>
</div>

{#if cours}
	<div class="page">
		<!-- HEADER -->
		<div class="header">
			<h1>{cours.title}</h1>
			<Category
				category={cours.category}
				--border_color={cours.category.borderColor}
				--text_color={cours.category.textColor}
			/>
		</div>

		<!-- MAIN -->
		{#if authStore.user?.role != 'student' && authStore.user?.id=== cours.authorId}
			<div class="card top">
				<button class="button" onclick={changeVisibility}
					>Rendre le cours {visibility ? 'priver' : 'public'}</button
				>
				<button class="button" onclick={modalDeleteCours}>Supprimer le cours</button>
			</div>
		{/if}
		<div class="layout">
			<div class="card side mobile-only">
				<div class="section">
					<p class="label">Difficulté</p>
					<LevelBar class="difficulty-bar" level={cours.difficulty} />
				</div>
			</div>
			<!-- LEFT -->
			<div class="left">
				<div class="card">
					<div class="card-title">Résumé</div>
					<p>{cours.littleSummary}</p>
				</div>

				<!-- MOBILE OBJECTIFS -->
				<div class="card mobile-only">
					<div class="card-title">Objectifs</div>
					<ul class="list">
						{#each cours.learningObjectives as obj}
							<li>{obj.objectif.title}</li>
						{/each}
					</ul>
				</div>

				<!-- AVIS -->
				<div class="opinion">
					<div class="card opinions">
						<div class="opinions_presentation">
							<div class="card-title dark">Avis des apprenants</div>
							{#if authStore.user?.role === 'student'}
								<button class="btn-add" onclick={modalAddOpinion}>
									{#if alreadyOpinion?.IsOpinionExisting == true}
										Modifier mon avis sur le cours
									{:else}
										Mettre un avis sur ce cours
									{/if}
								</button>
							{/if}
						</div>
						{#each cours.opinions as opinion, i}
							<div class="review {i === 0 ? 'first' : ''}">
								<div class="review-top">
									<div class="avatar"></div>

									<div>
										<div class="name">{opinion.user.pseudo}</div>
										<div class="stars">
											{#each getStars(opinion.note) as type}
												<span class="star-{type}">★</span>
											{/each}
										</div>
									</div>
								</div>

								<div class="text">{opinion.content}</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- RIGHT -->
			<div class="right">
				<div class="card side desktop-only">
					<div class="section">
						<p class="label">Difficulté</p>
						<LevelBar class="difficulty-bar" level={cours.difficulty} />
					</div>

					<div class="section desktop-only">
						<p class="label">OBJECTIFS PÉDAGOGIQUES</p>
						<ul class="list">
							{#each cours.learningObjectives as obj}
								<li>{obj.objectif.title}</li>
							{/each}
						</ul>
					</div>
					<div class="tool-mobile">
						<div class="section">
							<p class="label">OUTILS NÉCESSAIRES</p>
							<ul class="list">
								{#each cours.tools as tool}
									<li>{tool.tools.name}</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>

				<a onclick={addCoursActiveToStudent} class="cta" href="/cours/{cours.slug}/cours"
					>Démarrer le cours →</a
				>
			</div>
		</div>
	</div>
	<ModalValidator
		message="Voullez vous supprimer la page ?"
		cancel={closeDeleteCoursModale}
		confirm={deleteCours}
	/>
{/if}
<ModalOpinion
	message="Veuillez laisser votre avis : "
	cancel={closeDeleteOpinionModale}
	confirm={alreadyOpinion?.IsOpinionExisting == false ? ValidateDataModal : patchOpinions}
	opinion={alreadyOpinion}
/>

<style>
	/* RESET */
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	.opinions_presentation {
		display: flex;
		justify-content: space-between
	}
	.btn-add {
		font-family: 'DM Sans', sans-serif;
		font-size: 10px;
		font-weight: 500;
		padding: 5px 10px;
		cursor: pointer;
		border: none;
		color: white;
		border-radius: 10px;
		background: #1d4e89;
	}
	/* PAGE */
	.page {
		padding: 32px 48px;
		background: var(--background-color);
		min-height: 100vh;
		font-family: 'Inter', sans-serif;
	}

	/* BACK */
	.back-link {
		text-decoration: none;
		font-size: 14px;
		color: #555;
	}

	/* HEADER */
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24px;
	}

	.header h1 {
		font-size: 26px;
		font-weight: 700;
	}

	/* LAYOUT */
	.layout {
		display: grid;
		grid-template-columns: 1fr 320px;
		gap: 24px;
	}

	.top {
		margin-bottom: 20px;
	}

	/* LEFT */
	.left {
		display: flex;
		flex-direction: column;
		gap: 20px;
		order:2 ;
	}

	/* RIGHT */
	.right {
		display: flex;
		flex-direction: column;
		gap: 16px;
		order: 2;
	}

	/* CARD */
	.card {
		background: white;
		border: 1px solid #e8e8e8;
		border-radius: 12px;
		padding: 20px;
	}

	.card-title {
		font-weight: 700;
		color: #f4a623;
		margin-bottom: 10px;
	}

	.card-title.dark {
		color: #1a1a1a;
	}

	/* LIST */
	.list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.list li::before {
		content: '✓';
		color: #3ab55b;
		margin-right: 6px;
	}

	/* SIDE */
	.side .section {
		margin-bottom: 12px;
	}

	.label {
		font-size: 11px;
		font-weight: 700;
		color: #888;
		margin-bottom: 6px;
	}

	/* CTA */
	.cta {
		background: #f4a623;
		color: #1d4e89;
		border: none;
		border-radius: 10px;
		padding: 14px;
		font-weight: 600;
		cursor: pointer;
	}

	.button {
		padding: 8px 16px;
		border-radius: var(--border-radius);
		border: none;
		font-size: 14px;
		font-weight: 500;
		color: var(--button-text-color);
		background-color: var(--button-backgroung-color);
		transition:
			background 0.15s,
			color 0.15s;
		text-align: center;
		width: max-content;
	}

	.button:hover {
		background: var(--button-backgroung-color-hover);
		cursor: pointer;
	}

	/* REVIEWS */
	.review {
		border-top: 1px solid #eee;
		padding-top: 12px;
		margin-top: 12px;
	}

	.review.first {
		border-top: none;
		margin-top: 0;
		padding-top: 0;
	}

	.review-top {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.avatar {
		width: 32px;
		height: 32px;
		background: #ddd;
		border-radius: 50%;
	}

	.name {
		font-weight: 600;
		font-size: 13px;
	}

	.text {
		margin-left: 42px;
		font-size: 13px;
		color: #555;
	}

	/* STARS */
	.star-full,
	.star-half {
		color: #f4a623;
	}
	.star-empty {
		color: #ddd;
	}
	.mobile-only {
		display: none;
	}
	.desktop-only {
		display: block;
	}

	/* RESPONSIVE */
	@media (max-width: 768px) {
		.page {
			padding: 16px;
		}

		.layout {
			display: flex;
			flex-direction: column;
		}

		.desktop-only {
			display: none;
		}
		.mobile-only {
			display: block;
		}
		.cta {
			position: sticky;
			bottom: 10px;
		}
		.tool-mobile {
			display: none;
		}
		.desktop-only {
			display: none;
		}
		.right{
			order: 1;
		}
	}
</style>

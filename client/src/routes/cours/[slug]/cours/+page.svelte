<script lang="ts">
	import DOMPurify from 'dompurify';
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	import '../../../../app.css';

	import Header from '$lib/assets/components/Header.svelte';
	import Footer from '$lib/assets/components/Footer.svelte';
	import App from '$lib/assets/components/App.svelte';
	import Main from '$lib/assets/components/Main.svelte';
	import Category from '$lib/assets/components/Category/Category.svelte';
	
	import api from '$lib/services/api.service';
	import { getAuth, authStore } from '$lib/services/localstorage.service.svelte';

	import type { ICours, ICoursContent } from '$lib/@types/types';
	import ModalValidator from '$lib/assets/components/Validator/ModalValidator.svelte';
	import type { IModal, ITextArea } from '$lib/@types/html';
	

	let isLoading = $state(false);
	let cours: ICours | null = $state(null);
	let currentPage: number = $state(1);
	let coursContent: ICoursContent|null = $state(null);
	let modifier = $state(false);
	let currentPageId : ICoursContent |null | undefined = $state(null);
	let textButton = $derived(modifier ? 'Annuler' : 'Modifier');

	$effect(() => {
		if (modifier ) {
			textAreaAdjust(document.getElementById('text_area') as ITextArea);
		}
	});

	onMount(async () => {
		isLoading = true;
		const response = await api('api/cours?slug=' + page.params.slug, 'GET');
		cours = response.data;
		if (cours) {
			getCours();
			isLoading = false;
		}
		getAuth();
		
	});

	function handleModify(){
		modifier = !modifier;
	}

	async function getCours() {
		isLoading = true;
		const response = await api('api/cours?slug=' + page.params.slug, 'GET');
		cours = response.data;
		if (cours) {
			currentPageId = cours.content.find((content) => content.numberPage == currentPage);
			if (currentPageId){
				console.log(currentPageId)
				const response = await api('api/cours-contents/' + currentPageId.id, 'GET');
				coursContent = response.data as ICoursContent;
				if(coursContent){
					coursContent.content = DOMPurify.sanitize(coursContent.content);
					isLoading = false;
				}
			}
		}
		
	}

	function goToPrevious() {
		if (currentPage > 1) {
			currentPage--;
			getCours();
		}
	}

	function goToNext() {
		if ( cours && currentPage < cours.numberPage) {
			currentPage++;
			getCours();
		}
	}

	

	async function valider() {
		const textArea:ITextArea=document.getElementById('text_area') as ITextArea
		const response = await api('api/cours-contents/' + currentPageId?.id, 'PATCH', {
			content: textArea.value
		});
		handleModify()
		getCours()
	}

	function textAreaAdjust(element:ITextArea) {
		element.style.height = "1px";
		element.style.height = (25+element.scrollHeight)+"px";
	}

	async function createPage(){
		const response = await api('api/cours-contents', 'POST', {
			content: `Nouvelle page n°${currentPage+1}`,
			numberPage: currentPage+1,
      		coursId: cours?.id
		});
		currentPage++
		getCours()
	}

	function modalDeletePage(){
		const modal = document.getElementById("ModalValidator") as IModal
		modal.show()
	}

	function closeDeletePageModale(){
		const modal = document.getElementById("ModalValidator") as IModal
		modal.close()
	}
	async function deletePage(){
		const response = await api('api/cours-contents/' + currentPageId?.id, 'DELETE')
		closeDeletePageModale()
		if(currentPage!=1){
			currentPage--
		}
		getCours()
		
	}
</script>

<App>
	<Header />
	<Main class="main-cours">
		{#if cours && coursContent}
			<div class="cours_header">
				<h1>{cours.title}</h1>
				<div class="header-right">
					<Category
						category={cours.category}
						--border_color={cours.category.borderColor}
						--text_color={cours.category.textColor}
						--background-color={cours.category.backgroundColor}/>
					<span class="author">par <span>{cours.author.pseudo}</span></span>
				</div>
			</div>

			<div class="cours-main">
				{#if authStore.user?.role!= 'student'}
					<button
						class="button_tools flex-end"
						onclick={() => {handleModify()}}>{textButton}</button>

					{#if !modifier}
						{@html marked.parse(coursContent.content)}
					{:else}
						<textarea class="text_area" id="text_area" onkeyup={(e)=>textAreaAdjust(e.currentTarget)}>{coursContent.content}</textarea>
						<button onclick={valider} class="button_tools flex-end">Valider</button>
						
					{/if}
				{:else}
					{@html marked.parse(coursContent.content)}
				{/if}
			</div>
			<div class="navigation-footer">
				<button class="nav-btn prev-btn" disabled={currentPage === 1} onclick={goToPrevious}
					>← Précédent</button
				>

				{#if authStore.user?.role != 'student'}
					<button
						class="button_tools"
						disabled={cours.numberPage ==1}
						onclick={() => {modalDeletePage()}}>Supprimer une Page</button>
				{/if}
				
				<span class="page-indicator">Page {currentPage} sur {cours?.numberPage}</span>

				{#if authStore.user?.role != 'student'}
					<button
						class="button_tools"
						onclick={() => {createPage()}}>Ajouter une Page</button>
				{/if}

				<button
					class="nav-btn next-btn"
					disabled={currentPage === cours?.numberPage}
					onclick={goToNext}>
					Suivant →
				</button>
			</div>

			<div class="card">
				<div class="reviews-title">Commentaires et avis</div>
			</div>
		{/if}
		<ModalValidator
		message="Voullez vous supprimer la page ?"
		cancel={closeDeletePageModale}
		confirm={deletePage}
		/>
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
		display: flex;
		flex-direction: column;
		gap:20px;
	}

	.text_area{
		max-width:100%;

	}
	
	.reviews-title {
		font-size: 15px;
		font-weight: 700;
		color: #1a1a1a;
		margin-bottom: 16px;
	}

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

	.button_tools {
		padding: 8px 16px;
		border-radius: var(--border-radius);
		border: none;
		font-size: 14px;
		font-weight: 500;
		color: var(--button-text-color);
		background-color: var(--button-backgroung-color) ;
		transition:
			background 0.15s,
			color 0.15s;
		text-align: center;
		width: max-content;
	}

	.button_tools:hover {
		background: var(--button-backgroung-color-hover);
		cursor: pointer;
	}

	.button_tools:disabled {
		background: #d0d0d0;
		cursor: not-allowed;
		color: #999;
	}

	.flex-end {
		align-self: end;
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

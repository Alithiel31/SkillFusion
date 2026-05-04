<script lang='ts'>
	import api from "$lib/services/api.service";
	import { onMount } from "svelte";
	import Category from "../Category/Category.svelte";

    const props=$props()
    let categories:Category[]=$state([])

    onMount(async()=>{
        const response = await api("api/categories")
        categories=response.data
    })

    function valideForm(event){
        event.preventDefault()
        const title = document.getElementById("title")?.value
        const littleSummary= document.getElementById("littleSummary")?.value
        const summary= document.getElementById("summary")?.value
        const categoryId= Number(document.getElementById("categoryId")?.value)
        const difficulty= Number(document.getElementById("difficulty")?.value)

        props.confirm({title,littleSummary,summary,categoryId ,difficulty})
    }

</script>
	<dialog class="overlay" id="modalNewCours">
		<div class="dialog">
			<h2>Nouveau Cours</h2>
            <form onsubmit={(event)=>valideForm(event)}>
            <div>   
                <label for="title">Titre du cours</label>
                <input type="texte" id="title" placeholder="Titre du cours" required>
            </div>
            <div>   
                <label for="littleSummary">Petit résumé du cours</label>
                <input type="texte" id="littleSummary" placeholder="Petit resumé du cours" required>
            </div>
            <div>   
                <label for="summary">Résumé du cours</label>
                <input type="texte" id="summary" placeholder="Resumé du cours" required>
            </div>
            <div>   
                <label for="categoryId">Catégorie</label>
                <select id="categoryId">
                    <option value="">Selectionner une categorie</option>
                    {#each categories as category}
                        <option value={category.id}>{category.name}</option>
                    {/each}
                </select>
            </div>
            <div>   
                <label for="difficulty">Difficulté</label>
                <select id="difficulty">
                    <option value="">Selectionner une difficulté</option>
                    {#each [1,2,3,4,5] as difficulty }
                        <option value={difficulty}>{difficulty}</option>
                    {/each}
                </select>
            </div>
                <button class="confirm">
					Valider
				</button>
            </form>
			<div class="actions">
				<button class="cancel" onclick={props.cancel}>
					Annuler
				</button>
			</div>
		</div>
	</dialog>
<style>
	.overlay {
		position: fixed;
		inset: 0;
        width:100%;
        height:100vh;
		background: rgba(0, 0, 0, 0.6);
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}

	.dialog {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		width: 90%;
		max-width: 400px;
		text-align: center;
        margin: auto;
        margin-top:50vh;
        transform: translateY(-50%);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	h2 {
		margin-bottom: 1rem;
	}


	.actions {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	button {
		flex: 1;
		padding: 0.75rem;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-weight: bold;
	}

	.cancel {
		background: #ddd;
	}

	.confirm {
		background: #e53935;
		color: white;
	}
</style>
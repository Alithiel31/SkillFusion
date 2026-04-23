<script lang="ts">
	let props = $props();
	import LevelBar from './levelbar/LevelBar.svelte';
</script>

<article class="cours-card">
	<div class="card__image"></div>
	<div class="card__body">
		<h3 class="card__title">{props.title}</h3>
		<div class="card__information">
			<span class="card-category"> {props.category.name} </span>
			<LevelBar level={props.difficulty} />
		</div>
	</div>
</article>

<style>
	.card__information{
		display: flex;
		bottom: 0;
		position: relative;
		justify-content: space-between;
		align-items: flex-end;
	}
	.card__body{
		padding: 5px 10px;
		height: 90px;
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.card-category {
		color: var(--text_color);
		font-size: 10px;
		font-family: 'DM Sans', sans-serif;
		font-weight: 500;
		border: 1px solid var(--border_color);
		border-radius: 20px;
		padding: 5px 15px;
		align-items: flex-end;
		margin: 10px;
	}
	.cours-card {
		display: flex;
		flex-direction: row;
		position: relative;
		align-items: center;
		gap: 0;
		background: var(--background-white);
		border-radius: var(--border-radius);
		overflow: hidden;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		cursor: pointer;
		width: 100%;
	}
	.cours-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
	}
	.card__title{
		width: 90%;
		flex-grow: 1;
	}
	.card__image {
		height: 100%;
		width: 10%;
		min-width: 10%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--card__image__color);
	}
	@media (min-width: 768px) {
		.card__body{
			overflow: hidden;
		}
		.card__title {
			align-self: flex-start;
		}

	}
	@media (min-width: 1024px) {
		.cours-card {
			width: 48%;
			height: 240px;
			flex-direction: column;
		}
		.card__image {
			height: 100px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--card__image__color);
		}
		.card__body{
			overflow: unset;
			padding: 10px;
		}
		.card__title{
			width: 100%;
		}
	}
</style>

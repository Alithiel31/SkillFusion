<script lang="ts">
	let props = $props()
	import LevelBar from './levelbar/LevelBar.svelte';
</script>

<div class="card-body">
	<div class="card__cours__color"></div>
	<div class="card__cours__tittle">
		<h3 class="card-title">{props.title}</h3>
		<span class="card-category"> {props.category.name} </span>
	</div>
	<div class="card__cours__level-row">
		<LevelBar level = {props.difficulty} />
	</div>
</div>

<style>
	.card-category {
		color: var(--text_color);
		font-size: 10px;
		font-family: 'DM Sans', sans-serif;
		font-weight: 500;
		border: 1px solid var(--border_color);
		border-radius: 20px;
		padding: 5px 15px;
		align-items: flex-end;
	}
	.card__cours__color {
		padding: 15px;
		margin: 10px;
		border-radius: 5px;
		background-color: #1d4e89;
	}
	.card-body {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0;
		padding: 20px;
		height: 10vh;
	}
	.card-body {
		background: white;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		cursor: pointer;
	}
	.card-body:hover {
		transform: translateY(-3px);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
	}
	@media (min-width: 768px) {
		.card-body {
			width: 100%;
			height: 20%;
			padding-top:  0;
			flex-direction: column;
			justify-content: start;
		}
		.card__cours__tittle{
			align-self: flex-start;
		}
		.card__cours__color {
			margin: 0;
			width: 110%;
		}
		.card__cours__level-row {
			display: flex;
			align-self: flex-end;
			padding: 0;
		}
	}
	@media (min-width: 1024px) {
		.card-body{
			width: 40%;
			height: 200px;
		}
		.card__cours__color {
			margin: 0;
			width: 110%;
			height: 80px;
		}
	}
</style>

<script lang="ts">
	import LevelBar from './levelbar/LevelBar.svelte';
</script>

<div class="card-body">
	<div class="card-body__presentation">
		<div class="card__cours__color"></div>
		<div>
			<h3 class="card-title">Mon super titre de cours</h3>
			<span class="card-category"> Categorie </span>
		</div>
	</div>
	<div class="level-row">
		<LevelBar level="1" />
	</div>
</div>

<style>
	.card-category {
		color: #1d4e89;
		font-size: 10px;
		font-family: 'DM Sans', sans-serif;
		font-weight: 500;
		background-color: #ebf2fa;
		border: 1px solid #b5d4f4;
		border-radius: 20px;
		padding: 5px 15px;
	}
	.card-body__presentation {
		display: flex;
		flex-direction: row;
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
		padding: 0;
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
			height: 200px;
                        width: 40%;
			flex-direction: column;
		}
		.card-body__presentation {
			flex-direction: column;
		}
		.card__cours__color {
			margin: 0;
                        height: 80px;
			width: 100%;
		}
	}
</style>

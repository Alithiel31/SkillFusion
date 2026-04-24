<script>
	let { children } = $props();
</script>

<section class="section__main">
	{@render children()}
</section>

<style>
	.section__main {
		padding: 20px;
		flex-grow: 1;
		background-color: var(--background-color);
	}
	@media (min-width: 1024px){
		.section__main {
			padding: 25px 100px;
		}
	}
</style>

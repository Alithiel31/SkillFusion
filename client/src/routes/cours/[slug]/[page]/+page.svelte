<script>
	import Cours from '$lib/assets/components/Cours/Cours.svelte';
	import Header from '$lib/assets/components/Header.svelte';
	import Footer from '$lib/assets/components/Footer.svelte';
	import App from '$lib/assets/components/App.svelte';
	import Main from '$lib/assets/components/Main.svelte';
</script>

<App>
	<Header />
	<Main>
		<Cours />
	</Main>
	<Footer />
</App>

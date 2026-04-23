<script>
	import Footer from "$lib/assets/components/Footer.svelte";
	import Header from "$lib/assets/components/Header.svelte";
</script>

<Header/>
<div>

        <button><a href="/tableau-de-bord/admin">admin</a></button>
        <button><a href="/tableau-de-bord/instructor">instructor</a></button>
        <button><a href="/tableau-de-bord/student">student</a></button>

</div>

<Footer/>

<style>
div{
        display: flex;
        justify-content:  center;

}
</style>
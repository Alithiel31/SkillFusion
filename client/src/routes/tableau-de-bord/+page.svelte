<script>
	import Footer from "$lib/assets/components/Footer.svelte";
	import Header from "$lib/assets/components/Header.svelte";
</script>

<Header/>
<div>

        <button><a href="/admin">admin</a></button>
        <button><a href="/instructor">instructor</a></button>
        <button><a href="/student">student</a></button>

</div>

<Footer/>

<style>
div{
        display: flex;
        justify-content:  center;
}
</style>
<script lang="ts">
	import Footer from "$lib/assets/components/Footer.svelte";
	import Header from "$lib/assets/components/Header.svelte";
        import AdminDashBoard from "$lib/assets/components/DashBoard/AdminDashBoard.svelte";
        import InstructorDashBoard from "$lib/assets/components/DashBoard/InstructorDashBoard.svelte";
        import StudentDashBoard from "$lib/assets/components/DashBoard/StudentDashBoard.svelte";
        import {getAuth, authStore} from "$lib/services/localstorage.service.svelte"
        import type {IUserLocalStorage} from "$lib/@types/type.localStorage"
        import { onMount } from 'svelte';
        let user:IUserLocalStorage|null = $state(null);

        onMount(()=>{
		getAuth()
		user = authStore.user
})

</script>

<Header/>
<div>
{#if user?.role === "admin"}
 <AdminDashBoard/>
 {:else if user?.role === "instructor"}
 <InstructorDashBoard/>
 {:else if user?.role === "student"}
 <StudentDashBoard/>
{/if}

</div>

<Footer/>

<style>
div{
        display: flex;
        justify-content:  center;

}
</style>
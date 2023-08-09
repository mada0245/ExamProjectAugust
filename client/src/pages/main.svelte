<script>
  import { authorisation, isLoggedIn } from '../stores/globalStores'
  import CheckAuth from "../components/checkAuth.svelte";
  import { navigate } from "svelte-navigator";
  import { onMount } from 'svelte';

  let authorised = false; 

 
    authorisation.subscribe(updatedAuthorisation => {
      authorised = updatedAuthorisation;
    });
 
  let logged = false; 

 
  isLoggedIn.subscribe(updatedLogged => {
    logged = updatedLogged;
  });
 

  onMount(()=>{
    if(logged === false){
        console.log('You must log in')
        navigate('/');
    }
  });
  
  

</script>

<CheckAuth />
  
<h1>Welcome</h1>
<p>Choose a option:</p>

{#if authorised === true}
  <div>
    <button class="button confirmButton" on:click={()=>{navigate("/mainPage/todayMealPage")}}>Today's Meal</button>
    <button class="button confirmButton" on:click={()=>{navigate("/mainPage/recepiesListPage")}}>Recepies List</button>
    <button class="button confirmButton" on:click={()=>{navigate("/mainPage/createRecepiePage")}}>Create Recepie</button>
  </div>
{:else}
  <div>
    <button class="button confirmButton" on:click={()=>{navigate("/mainPage/todayMealPage")}}>Today's Meal</button>
    <button class="button confirmButton" on:click={()=>{navigate("/mainPage/recepiesListPage")}}>Recepies List</button>
  </div> 
{/if}


  
<script>
  import { authorisation } from '../stores/globalStores'
  import CheckAuth from "../components/checkAuth.svelte";
  import { navigate } from "svelte-navigator";

  let authorised = false; 

 
    authorisation.subscribe(updatedAuthorisation => {
      authorised = updatedAuthorisation;
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


  
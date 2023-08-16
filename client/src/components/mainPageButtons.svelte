<script>
    import { navigate } from "svelte-navigator";

    export let authorised;
   

    
</script>

<h1>Welcome</h1>
<p>Choose a option:</p>

{#if authorised === true}
  <div>
    <button class="button confirmButton" on:click={()=>{navigate("/mainPage/todayMealPage")}}>Today's Meal</button>
    <button class="button confirmButton" on:click={()=>{navigate("/mainPage/recepiesListPage")}}>Recepies List</button>
    <button class="button confirmButton" on:click={()=>{navigate("/mainPage/createRecepiePage")}}>Create Recepie</button>
    <button class="button confirmButton" on:click={()=>{navigate("/mainPage/deleteRecepiePage")}}>Delete a Recepie</button>
  </div>
{:else if authorised === false}
  <div>
    <button class="button confirmButton" on:click={()=>{navigate("/mainPage/todayMealPage")}}>Today's Meal</button>
    <button class="button confirmButton" on:click={()=>{navigate("/mainPage/recepiesListPage")}}>Recepies List</button>
  </div> 
{/if}
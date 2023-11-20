<script>
    import { navigate } from "svelte-navigator";

    export let authorised;
   

    
</script>

<h1>Welcome</h1>
<p>Choose a option:</p>

{#if authorised === true}
  <div>
    <button class="button confirmButton" on:click={()=>{navigate("/todayMeal")}}>Today's Meal</button>
    <button class="button confirmButton" on:click={()=>{navigate("/recepiesList")}}>Recepies List</button>
    <button class="button confirmButton" on:click={()=>{navigate("/createRecepie")}}>Create Recepie</button>
    <button class="button confirmButton" on:click={()=>{navigate("/deleteRecepie")}}>Delete a Recepie</button>
  </div>
{:else if authorised === false}
  <div>
    <button class="button confirmButton" on:click={()=>{navigate("/todayMeal")}}>Today's Meal</button>
    <button class="button confirmButton" on:click={()=>{navigate("/recepiesList")}}>Recepies List</button>
  </div> 
{/if}
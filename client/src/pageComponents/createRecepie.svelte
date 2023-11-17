<script>
import AddNewRecepie from '../childComponents/addNewRecepie.svelte';
import CheckLogIn from '../childComponents/checkLogIn.svelte';


let currentIngredientes = ["apple", "oil", "milk", "cheese", "tomato", "onion", "flour", "cereals", "chocolate"];
let recepiesName;
let recepiesIngredientes = [];
let recepiesDescription;

</script>

<CheckLogIn />

<h1 class="Title">Rcepie creation</h1>

<div>
    <label for="recepiesName">Recepie's name:</label>
    <br>
    <input type="text" id="recepiesName" bind:value={recepiesName}><br><br>

    

    <label for="recepiesDescription">How to prepare:</label>
    <br>
    <textarea id="recepiesDescription" bind:value={recepiesDescription}></textarea>

    <div class="ingredientesSelector">
        
        {#each currentIngredientes as ingredient}
            <label>
                <input
                    type="checkbox"
                    name="currentIngredientes"
                    value={ingredient}
                    bind:group={recepiesIngredientes}
                />
        
                {ingredient}
            </label>
        {/each}
        
        {#if recepiesIngredientes.length === 0}
            <p>Please select ingredientes</p>
        {:else if recepiesIngredientes.length < 2}
            <p>Please select at least 2 ingredientes</p>
        {:else}
            <p>You have chosen {recepiesIngredientes}</p>
            <AddNewRecepie nameToFetch={recepiesName} ingredientesToFetch={recepiesIngredientes} descriptionToFetch={recepiesDescription}/>
        {/if}
        
    </div>

</div>




<style>

  
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
  
    input[type="text"] {
      width: 25%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    #recepiesDescription{
        width: 100%;
        height: 100px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
       
    }
  
    .ingredientesSelector {
      margin-top: 20px;
    }
  
    .ingredientesSelector label {
      display: inline-block;
      margin-right: 10px;
    }

  </style>
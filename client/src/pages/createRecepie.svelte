<script>
import { authorisation, isLoggedIn} from '../stores/globalStores'
import { onMount } from 'svelte';
import { navigate } from 'svelte-navigator';
import AddNewRecepie from '../components/addNewRecepie.svelte';

let authorised = false; 


authorisation.subscribe(updatedAuthorisation => {
    authorised = updatedAuthorisation;
});

let logged = false; 


isLoggedIn.subscribe(updatedLogged => {
    logged = updatedLogged;
});


onMount(()=>{
if(authorised === false){
    console.log('You must log in as an admin')
    navigate('/mainPage');
}else if(logged === false){
    console.log('You must log in')
    navigate('/');
}
});

let currentIngredientes = ["apple", "oil", "milk", "cheese", "tomato", "onion", "flour", "cereals", "chocolate"];
let recepiesName;
let recepiesIngredientes = [];
let recepiesDescription;

</script>

<h1 class="Title">Rcepie creation</h1>

<div>
    <label for="recepiesName">Recepie's name:</label>
    <br>
    <input type="text" id="recepiesName" bind:value={recepiesName}><br><br>

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
        {/if}
        
    </div>

    <label for="recepiesDescription">How to prepare:</label>
    <br>
    <input type="text" id="recepiesDescription" bind:value={recepiesDescription}><br><br>
</div>

<AddNewRecepie nameToFetch={recepiesName} ingredientesToFetch={recepiesIngredientes} descriptionToFetch={recepiesDescription}/>

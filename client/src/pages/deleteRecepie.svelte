<script>
    import { authorisation, isLoggedIn, BASE_URL } from '../stores/globalStores'
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-navigator';
    import DeleteARecepie from '../components/deleteARecepie.svelte';
    
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
    
    let theDeleteName;
    let recepiesToDelete = [];


    onMount(async () => {
    const registerURL = `${$BASE_URL}/api/recepies/get`;

    try {
        
        const response = await fetch(registerURL);
        let result = await response.json();

        recepiesToDelete = result.map(recepie => recepie.name);

    } catch (error) {

        console.error('Error getting the recepies', error);

    }
});

    
    </script>
    
    <h1 class="Title">Delete a recepie</h1>
    <h2 class="subtitle">Please select the recepie you want to delete</h2>
    
    {#each recepiesToDelete as recepie}
	<label>
		<input
			type="radio"
			name="scoops"
			value={recepie}
			bind:group={theDeleteName}
		/>

        {recepie}
	</label>
{/each}

<div>
    {#if theDeleteName}
        <p>The {theDeleteName} will be deleted</p>
    {:else}
        <p>No recepie selected</p>
    {/if}
</div>

<DeleteARecepie recepieToDelete = {theDeleteName} />

    
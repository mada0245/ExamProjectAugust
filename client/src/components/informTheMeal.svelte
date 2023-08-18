<script>
    import socket from '../util/socketInitializator'

    let todaysRecepies = [];
   

    function todayRecepies(){
        socket.emit("recepies", todaysRecepies);
    }

	export let recepiesNames = [];
    
</script>

<h1 class="title">What would you like to eat today ?</h1>

<div class="Meal">
    
    {#each recepiesNames as recepie}
        <label>
            <input
                type="checkbox"
                name="recepies"
                value={recepie}
                bind:group={todaysRecepies}
            />
    
            {recepie}
        </label>
    {/each}
    
    {#if todaysRecepies.length === 0}
        <p>Please select a recepie</p>
    {:else if todaysRecepies.length > 6}
        <p>You have chosen {todaysRecepies}</p> 
        <p>Are you making a party ?</p>
        <button on:click={todayRecepies}>Send</button>
    {:else if todaysRecepies.length > 0}
        <p>You have chosen {todaysRecepies}</p>
        <button on:click={todayRecepies}>Send</button>
    {/if}
    
</div>

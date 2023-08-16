<script>
    import io from "socket.io-client";

    const socket = io("localhost:8000");

    let todaysRecepies = [];
   

    function todayRecepies(){
        socket.emit("recepies", todaysRecepies);
    }

    socket.on("Answer", (data) => {
      
        alert("The server says: " + data)

  });

    
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
    {:else}
        <p>You have chosen {todaysRecepies}</p>
    {/if}
    
</div>

<button on:click={todayRecepies}>Send</button>
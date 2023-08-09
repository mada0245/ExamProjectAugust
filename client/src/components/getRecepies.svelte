<script>
    export let recepiesList = [];
    let seeRecepie; 
  </script>
  
  {#each recepiesList as recepie}
      <h3 on:click={() => seeRecepie = recepie} on:keydown={seeRecepie}>{recepie.name}</h3>
      {#if seeRecepie === recepie}
        <div class = "recepiesList">
          <p>Ingredientes - {recepie.ingredients}</p>
          <p>How to prepare - {recepie.description}</p>
        </div>
      {/if}
  {/each}
  
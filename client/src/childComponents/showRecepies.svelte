<script>
    export let recepiesList = [];
    let seeRecepie; 
  </script>
  
  {#each recepiesList as recepie}
  <div class="recepies-container">
      <h3 class="recepie-name" on:click={() => seeRecepie = recepie} on:keydown={seeRecepie}>{recepie.name}</h3>
      {#if seeRecepie === recepie}
        <div class = "recepies-details">
          <p class="ingredientes">Ingredientes - {recepie.ingredients}</p>
          <p class="preparation">How to prepare - {recepie.description}</p>
        </div>
      {/if}
  </div>
  {/each}

  <style>
    .recepies-container {
      border: 1px solid #ccc;
      padding: 10px;
      margin: 10px 0;
      cursor: pointer;
      border-radius: 5px;
    }
  
    .recepies-container:hover {
      background-color: #f0f0f0;
    }
  
    .recepie-name {
      margin: 0;
      color: #333;
      font-size: 18px;
      font-weight: bold;
    }
  
    .recepies-details {
      margin-top: 10px;
      padding: 10px;
      border: 1px solid #ccc;
      background-color: #f9f9f9;
      border-radius: 5px;
    }
  
    .ingredientes, .preparation {
      margin: 0;
      font-size: 14px;
      color: #555;
    }
  </style>
  
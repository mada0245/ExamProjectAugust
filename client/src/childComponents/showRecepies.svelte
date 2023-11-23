<script>
  export let recepiesList = [];
  let seeRecepie;

  let filter = "";

  function searchRecepies() {
    const recepieList = document.getElementById("myRecepies");
    const span = recepieList.getElementsByTagName("span");

    for (let i = 0; i < span.length; i++) {
      const h3 = span[i].querySelector("h3");
      const textValue = h3.textContent || h3.innerText;

      if (textValue.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
        span[i].style.display = "";
      } else {
        span[i].style.display = "none";
      }
    }
  }
</script>

<input
  type="text"
  placeholder="Search a recepie"
  bind:value={filter}
  on:input={searchRecepies}
  class="searchBar"
/>

<div id="myRecepies">
  {#each recepiesList as recepie}
    <span>
      <div class="recepies-container" id="recepies-container">
        <h3
          class="recepie-name"
          on:click={() => (seeRecepie = recepie)}
          on:keydown={seeRecepie}
        >
          {recepie.name}
        </h3>
        {#if seeRecepie === recepie}
          <div class="recepies-details">
            <p class="ingredientes">Ingredientes - {recepie.ingredients}</p>
            <p class="preparation">How to prepare - {recepie.description}</p>
            <p class="preparationTime">
              Preparation time - {recepie.preparationTime} seconds
            </p>
          </div>
        {/if}
      </div>
    </span>
  {/each}
</div>

<style>
  .recepies-container {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
    cursor: pointer;
    border-radius: 5px;
    width: 90%;
  }

  .recepies-container:hover {
    border-color: #646cff;
  }

  .recepie-name {
    margin: 0;
    color: #646cff;
    font-size: 18px;
    font-weight: bold;
  }

  .recepie-name:hover {
    color: #535bf2;
  }

  .recepies-details {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    border-radius: 5px;
  }

  .ingredientes,
  .preparation,
  .preparationTime {
    margin: 0;
    font-size: 14px;
    color: #555;
    text-align: left;
  }

  .searchBar {
    border-radius: 5px;
    background-color: #f0f0f0;
    padding: 7px;
    width: 40%;
  }
</style>

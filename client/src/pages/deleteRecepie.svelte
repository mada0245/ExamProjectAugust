<script>
  import { BASE_URL } from "../stores/globalStores";
  import { onMount } from "svelte";
  import DeleteARecepie from "../components/deleteARecepie.svelte";
  import CheckLogIn from "../components/checkLogIn.svelte";

  let theDeleteName;
  let recepiesToDelete = [];

  onMount(async () => {
    const registerURL = `${$BASE_URL}/recepies`;

    try {
      const response = await fetch(registerURL);
      let result = await response.json();

      recepiesToDelete = result.map((recepie) => recepie.name);
    } catch (error) {
      console.error("Error getting the recepies", error);
    }
  });
</script>

<CheckLogIn />

<h1 class="Title">Delete a recepie</h1>
<h2 class="subtitle">Please select the recepie you want to delete</h2>

{#each recepiesToDelete as recepie}
  <label>
    <input
      type="radio"
      name="recepies"
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

<DeleteARecepie recepieToDelete={theDeleteName} />

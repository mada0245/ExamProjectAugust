<script>
  import { onMount } from "svelte";
  import { BASE_URL } from "../stores/globalStores";
  import ShowRecepies from "../components/showRecepies.svelte";
  import CheckLogIn from "../components/checkLogIn.svelte";

  let list = [];

  onMount(async () => {
    const registerURL = `${$BASE_URL}/recepies`;

    try {
      const response = await fetch(registerURL);
      let result = await response.json();

      list = result;
    } catch (error) {
      console.error("Error getting the recepies", error);
    }
  });
</script>

<CheckLogIn />

<h1>This is the recepies list</h1>

<ShowRecepies recepiesList={list} />

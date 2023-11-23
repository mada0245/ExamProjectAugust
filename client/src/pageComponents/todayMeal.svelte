<script>
  import { BASE_URL } from "../stores/globalStores";
  import { onMount } from "svelte";
  import InformTheMeal from "../childComponents/informTheMeal.svelte";
  import CheckLogIn from "../childComponents/checkLogIn.svelte";

  let fetchedRecepies = [];

  onMount(async () => {
    try {
      const registerURL = `${$BASE_URL}/recepies`;

      const response = await fetch(registerURL, {});

      if (response.ok) {
        let result = await response.json();
        fetchedRecepies = result.map((recepie) => recepie);
      }
    } catch (error) {
      console.error("Error getting the recepies", error);
    }
  });
</script>

<CheckLogIn />
<InformTheMeal recepies = {fetchedRecepies}/>

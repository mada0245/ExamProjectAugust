<script>
  import { onMount } from "svelte";
  import { BASE_URL, isLoggedIn } from "../stores/globalStores";
  import LoginIntoWebsite from "../childComponents/loginIntoWebsite.svelte";

  onMount(async () => {
    const registerURL = `${$BASE_URL}/tokens`;

    const response = await fetch(registerURL, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("The token has failed to be deleted");
    } else {
      isLoggedIn.set(false);
    }
  });
</script>

<div>
  <h1 class="title">Login Page</h1>
  <h2 class="subtitle">Please insert your credentials:</h2>
</div>

<LoginIntoWebsite />

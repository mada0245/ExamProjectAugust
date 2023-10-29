<script>
  import MainPageButtons from "../components/mainPageButtons.svelte";
  import CheckLogIn from "../components/checkLogIn.svelte";
  import { onMount } from "svelte";
  import { BASE_URL, token } from "../stores/globalStores";

  let authorisation;

  onMount(async () => {
    const registerURL1 = `${$BASE_URL}/tokens`;

    try {
      const response1 = await fetch(registerURL1);

      if (response1.ok) {
        let result = await response1.text();
        token.set(result);

        const registerURL2 = `${$BASE_URL}/checkAuth`;

        const response2 = await fetch(registerURL2, {
          headers: {
            "x-auth-token": result,
          },
        });

        if (response2.ok) {
          authorisation = true;
        } else {
          authorisation = false;
        }
      }
    } catch (error) {
      console.error("Error getting the token", error);
    }
  });
</script>

<CheckLogIn />
<MainPageButtons authorised={authorisation} />

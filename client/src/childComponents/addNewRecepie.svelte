<script>
  import { BASE_URL, token } from "../stores/globalStores";
  import { navigate } from "svelte-navigator";
  import toastr from "toastr";

  export let nameToFetch;
  export let ingredientesToFetch = [];
  export let descriptionToFetch;
  export let preparationTimeToFetch;

  let theToken;

  token.subscribe((value) => {
    theToken = value;
  });

  async function addRecepie() {
    if (
      nameToFetch &&
      ingredientesToFetch &&
      descriptionToFetch &&
      preparationTimeToFetch
    ) {
      if (
        typeof preparationTimeToFetch === "number" &&
        preparationTimeToFetch > 0 &&
        preparationTimeToFetch % 1 === 0
      ) {
        const registerURL = `${$BASE_URL}/recepies`;
        const data = {
          name: nameToFetch,
          ingredientes: ingredientesToFetch,
          description: descriptionToFetch,
          preparationTime: preparationTimeToFetch,
        };

        const response = await fetch(registerURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": theToken,
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          toastr.success(await response.text(), "✅Success✅");
          navigate("/main");
        } else {
          toastr.error(await response.text(), "❌ Error ❌");
        }
      } else {
        toastr.error(
          "The preparation time has to be an integer larger than 0",
          "❌ Error ❌"
        );
      }
    } else {
      toastr.error("Please complete everything", "❌ Error ❌");
    }
  }
</script>

<div>
  <button on:click={addRecepie}>Create Recepie</button>
</div>

<script>
  import { BASE_URL, token } from "../stores/globalStores";
  import { navigate } from "svelte-navigator";

  export let recepieToDelete;

  let theToken;

  token.subscribe((value) => {
    theToken = value;
  });

  async function deleteRecepie() {
    if (recepieToDelete) {
      const deleteRecepieName = recepieToDelete;
      const registerURL2 = `${$BASE_URL}/recepies${deleteRecepieName}`;

      const response2 = await fetch(registerURL2, {
        method: "DELETE",
        headers: {
          "x-auth-token": theToken,
        },
      });

      if (response2.ok) {
        alert(await response2.text());
        navigate("/mainPage");
      } else {
        alert(await response2.text());
      }
    } else {
      alert("Please select a recepie");
    }
  }
</script>

<div>
  <button class="button confirmButton" on:click={deleteRecepie}>Delete</button>
</div>

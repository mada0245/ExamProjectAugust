<script>
  import { BASE_URL, token } from "../stores/globalStores";
  import { navigate } from "svelte-navigator";
  import toastr from "toastr";

  export let recepieToDelete;

  let theToken;

  token.subscribe((value) => {
    theToken = value;
  });

  async function deleteRecepie() {
    if (recepieToDelete) {
      const deleteRecepieName = recepieToDelete;
      const registerURL2 = `${$BASE_URL}/recepies/${deleteRecepieName}`;

      const response2 = await fetch(registerURL2, {
        method: "DELETE",
        headers: {
          "x-auth-token": theToken,
        },
      });

      if (response2.ok) {
        toastr.success(await response2.text(),"✅Success✅");
        navigate("/main");
      } else {
        toastr.error(await response2.text(), "❌ Error ❌");
      }
    } else {
      toastr.error("Please select a recepie", "❌ Error ❌");
    }
  }
</script>

<div>
  <button class="button confirmButton" on:click={deleteRecepie}>Delete</button>
</div>

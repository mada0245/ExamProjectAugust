<script>
  import { navigate } from "svelte-navigator";
  import { BASE_URL, isLoggedIn } from "../stores/globalStores";
  import toastr from "toastr";

  let username;
  let inputPassword;

  async function redirectToMainPage() {
    if (username && inputPassword) {
      const url = `${$BASE_URL}/login`;

      const data = { name: username, password: inputPassword };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.text();
        saveToken(result);
      } else {
        console.error("Error:", response.status, response.statusText);
        toastr.error("Wrong Credetials", "❌ Error ❌");
      }
    } else {
      toastr.error("Please insert your credetials", "❌ Error ❌");
    }
  }

  async function saveToken(token) {
    const url = `${$BASE_URL}/tokens`;

    const data = { token };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      isLoggedIn.set(true);
      navigate("/main");
    } else {
      console.error("Error:", response.status, response.statusText);
      toastr.error("Failed to send token", "❌ Error ❌");
    }
  }
</script>

<div>
  <label for="username">Username:</label>
  <br />
  <input type="text" id="username" bind:value={username} /><br /><br />

  <label for="password">Password:</label>
  <br />
  <input type="password" id="password" bind:value={inputPassword} /><br /><br />
</div>

<div>
  <button class="button confirmButton" on:click={redirectToMainPage}
    >Login</button
  >
</div>

<style>
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>

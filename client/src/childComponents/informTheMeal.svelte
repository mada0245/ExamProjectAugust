<script>
  import socket from "../util/socketInitializator";
  import toastr from "toastr";

  export let recepies = [];

  let todaysRecepies = [];
  let todaysRecepiesPreparationTime = 0;
  let orderNumber = 1;

  function countdown(timer, newOrderNumber) {
    if (timer >= 0) {
      setTimeout(() => {
        toastr.warning(
          `The order number ${newOrderNumber} will take ${timer} seconds to be prepared`,
          "⌚️⌚️⌚️⌚️⌚️"
        );
        toastr.clear();
        timer--;
        countdown(timer, newOrderNumber);
      }, 1000);
    } else {
      toastr.success(
        `The order number ${newOrderNumber} is ready`,
        "😊😊😊😊😊"
      );
      toastr.clear();
    }
  }

  function setTimer() {
    for (let i = 0; i < todaysRecepies.length; i++) {
      const foundRecepie = recepies.find(
        (recepies) => recepies.name === todaysRecepies[i]
      );
      todaysRecepiesPreparationTime =
        todaysRecepiesPreparationTime + foundRecepie.preparationTime;
    }

    todayRecepies();

    let timer = todaysRecepiesPreparationTime;
    let newOrderNumber = orderNumber++;

    countdown(timer, newOrderNumber);

    todaysRecepiesPreparationTime = 0;
  }

  function todayRecepies() {
    socket.emit("recepies", todaysRecepies);
  }
</script>

<h1 class="title">What would you like to eat today ?</h1>

<div class="Meal">
  {#each recepies as recepie}
    <label style="display: flex; margin-left: 20%;">
      <input
        type="checkbox"
        name="recepies"
        value={recepie.name}
        bind:group={todaysRecepies}
      />
      <div>
        Recepie: {recepie.name}
      </div>
      <div style="margin-left: auto; margin-right: 25%;">
        Preparation Time {recepie.preparationTime} seconds
      </div>
    </label>
  {/each}

  {#if todaysRecepies.length === 0}
    <p>Please select a recepie</p>
  {:else if todaysRecepies.length > 6}
    <p>You have chosen {todaysRecepies}</p>
    <p>Are you making a party ?</p>
    <button on:click={setTimer}>Send</button>
  {:else if todaysRecepies.length > 0}
    <p>You have chosen {todaysRecepies}</p>
    <button on:click={setTimer}>Send</button>
  {/if}
</div>

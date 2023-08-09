<script>

    export let recepiesList = [];

</script>

{#each recepiesList as recepie}
    <li>{recepie.name}</li>
    <li>{recepie.ingredients}</li>
    <li>{recepie.description}</li>
{/each}
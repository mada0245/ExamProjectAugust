<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../stores/globalStores";
    import GetRecepies from "../components/getRecepies.svelte";

    let list

    onMount(async () => {
        const registerURL = `${$BASE_URL}/api/recepies/get`;
    
        try {
            
            const response = await fetch(registerURL);
            let result = await response.json();

            list = result;
            console.log("the getRecepies says: " + result);

        } catch (error) {

            console.error('Error getting the recepies', error);

        }
    });
</script>

<h1>This is the recepies list</h1>

<GetRecepies {...list}/>
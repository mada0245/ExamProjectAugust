<script>
import { onMount } from "svelte";
import { BASE_URL, isLoggedIn } from "../stores/globalStores";
import GetRecepies from "../components/getRecepies.svelte";
import { navigate } from "svelte-navigator";

let logged = false; 


isLoggedIn.subscribe(updatedLogged => {
    logged = updatedLogged;
});


onMount(()=>{
    if(logged === false){
        console.log('You must log in')
        navigate('/');
    }
});

let list = [];

onMount(async () => {
    const registerURL = `${$BASE_URL}/api/recepies/get`;

    try {
        
        const response = await fetch(registerURL);
        let result = await response.json();

        list = result;

    } catch (error) {

        console.error('Error getting the recepies', error);

    }
});

</script>

<h1>This is the recepies list</h1>

<GetRecepies recepiesList = {list}/>
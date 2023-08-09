<script>
import { isLoggedIn } from "../stores/globalStores";
import { onMount } from "svelte";
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
</script>

<h1>What would you like to eat today ?</h1>
<script>
import { authorisation, isLoggedIn } from '../stores/globalStores'
import { onMount } from 'svelte';
import { navigate } from 'svelte-navigator';

let authorised = false; 


authorisation.subscribe(updatedAuthorisation => {
    authorised = updatedAuthorisation;
});

let logged = false; 


isLoggedIn.subscribe(updatedLogged => {
    logged = updatedLogged;
});


onMount(()=>{
if(authorised === false){
    console.log('You must log in as an admin')
    navigate('/mainPage');
}else if(logged === false){
    console.log('You must log in')
    navigate('/');
}
});


</script>

<h1 class="Title">Rcepie creation</h1>

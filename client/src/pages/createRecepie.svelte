<script>
import { authorisation } from '../stores/globalStores'
import { onMount } from 'svelte';
import { navigate } from 'svelte-navigator';

let authorised = false; 

 
    authorisation.subscribe(updatedAuthorisation => {
      authorised = updatedAuthorisation;
    });
 

onMount(()=>{
    if(authorised === false){
        console.log('You must log in as an admin')
        navigate('/mainPage');
    }
});


</script>

<h1 class="Title">Rcepie creation</h1>

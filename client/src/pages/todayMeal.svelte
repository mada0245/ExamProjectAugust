<script>
import { isLoggedIn, BASE_URL } from "../stores/globalStores";
import { onMount } from "svelte";
import { navigate } from "svelte-navigator";
import ChooseMeal from "../components/chooseMeal.svelte";

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

	let fetchedNames = [];


onMount(async () => {

	try {

			const registerURL = `${$BASE_URL}/api/recepies/get`;

			const response = await fetch(registerURL, {
			
			});
			

			if(response.ok){
				let result = await response.json()
				fetchedNames = result.map(recepie => recepie.name);
			}
	
		
	} catch (error) {

		console.error('Error getting the recepies', error);

	}
});

</script>

<h1 class="title">What would you like to eat today ?</h1>

<ChooseMeal recepiesNames = {fetchedNames}/>
<script>
import { BASE_URL } from "../stores/globalStores";
import { onMount } from "svelte";
import InformTheMeal from "../components/informTheMeal.svelte";
import CheckLogIn from "../components/checkLogIn.svelte";

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

<CheckLogIn />
<InformTheMeal recepiesNames = {fetchedNames}/>
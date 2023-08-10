<script>
    import { BASE_URL } from "../stores/globalStores";

    export let nameToFetch;
    export let ingredientesToFetch = [];
    export let descriptionToFetch;


async function addRecepie (){

    if(nameToFetch && ingredientesToFetch && descriptionToFetch){
        const registerURL1 = `${$BASE_URL}/api/token/get`;

        try {
            
            const response1 = await fetch(registerURL1);
            let token = await response1.text();

            
            const registerURL2 = `${$BASE_URL}/api/recepies/add`;
            const data = {name: nameToFetch, ingredientes: ingredientesToFetch, description: descriptionToFetch};

            const response2 = await fetch(registerURL2, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(data)
            });
                

            if(response2.ok){
                    alert(await response2.text());
            }else{
                alert(await response2.text());
            }
	
        } catch (error) {

            console.error('Error getting the token', error);

        }

    }else{
        alert("Please complete everything")
    }

};
</script>

<div>
    <button class="button confirmButton" on:click={addRecepie}>Create Recepie</button>
</div>
<script>
    import { BASE_URL, token } from "../stores/globalStores";

    export let nameToFetch;
    export let ingredientesToFetch = [];
    export let descriptionToFetch;

    let theToken;

    token.subscribe(value => {
        theToken = value;
    });


async function addRecepie (){

    if(nameToFetch && ingredientesToFetch && descriptionToFetch){

        const registerURL = `${$BASE_URL}/api/recepies/add`;
        const data = {name: nameToFetch, ingredientes: ingredientesToFetch, description: descriptionToFetch};

        const response = await fetch(registerURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': theToken
            },
            body: JSON.stringify(data)
        });
            

        if(response.ok){
                alert(await response.text());
        }else{
            alert(await response.text());
        }
        
    }else{
        alert("Please complete everything")
    }

};
</script>

<div>
    <button on:click={addRecepie}>Create Recepie</button>
</div>
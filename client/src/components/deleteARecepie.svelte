<script>
    import { BASE_URL } from "../stores/globalStores";
    import { navigate } from "svelte-navigator";

    export let recepieToDelete;


async function deleteRecepie (){

    if(recepieToDelete){
        const registerURL1 = `${$BASE_URL}/api/token/get`;

        try {
            
            const response1 = await fetch(registerURL1);
            let token = await response1.text();

            const deleteRecepieName = recepieToDelete;
            const registerURL2 = `${$BASE_URL}/api/recepies/delete/${deleteRecepieName}`;
            

            const response2 = await fetch(registerURL2, {
                method: 'DELETE',
                headers: {
                    'x-auth-token': token
                }
            });
                

            if(response2.ok){
                    alert(await response2.text());
                    navigate("/mainPage")
            }else{
                alert(await response2.text());
            }
	
        } catch (error) {

            console.error('Error getting the token', error);

        }

    }else{
        alert("Please select a recepie")
    }

};
</script>

<div>
    <button class="button confirmButton" on:click={deleteRecepie}>Delete</button>
</div>
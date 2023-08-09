<script>
    import { beforeUpdate } from 'svelte';
    import { BASE_URL, authorisation } from '../stores/globalStores'


    beforeUpdate(async () => {

        const registerURL1 = `${$BASE_URL}/api/token/get`;
    
        try {
            
            const response1 = await fetch(registerURL1);
            let token = await response1.text();
    
            
                const registerURL2 = `${$BASE_URL}/api/checkAuth`;

                const response2 = await fetch(registerURL2, {
                headers: {
                    'x-auth-token': token
                } 
                });
                

                if(response2.ok){
                    console.log(await response2.text());
                    authorisation.set(true);
                }else{
                    console.log("A user has been logged in");
                    authorisation.set(false);
                }
           
            
        } catch (error) {

            console.error('Error getting the token', error);

        }
    });
</script>
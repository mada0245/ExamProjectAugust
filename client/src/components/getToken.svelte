<script>
    import { beforeUpdate } from 'svelte';
    import { BASE_URL, savedToken } from '../stores/globalStores'

    beforeUpdate(async () => {
        const registerURL = `${$BASE_URL}/api/token/get`;
    
        try {
            
            const response = await fetch(registerURL);
            let result = await response.text();
            savedToken.set(result);
            console.log("the getToken says: " + result);

        } catch (error) {

            console.error('Error getting the token', error);

        }
    });
</script>
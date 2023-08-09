 <script>
    import { beforeUpdate } from 'svelte';
    import { BASE_URL } from '../stores/globalStores'
    import LoginIntoWebsite from '../components/loginIntoWebsite.svelte';

    beforeUpdate(async () => {
        const registerURL = `${$BASE_URL}/api/token/delete`;
  
        const response = await fetch(registerURL, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('The token has failed to be deleted');
        }
    });
 </script>
 
 <div>
    <h1 class="title">Login Page</h1>
    <h2 class="subtitle">Please insert your credentials:</h2>
 </div>

 <LoginIntoWebsite />

 

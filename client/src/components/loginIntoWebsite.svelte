<script>
    import { navigate } from "svelte-navigator";
    import { BASE_URL, isLoggedIn } from '../stores/globalStores'
    let username;
    let inputPassword;

    async function redirectToMainPage() {
        //we proceed if the username in and passowrd inputs are filled
        if(username && inputPassword){
                
            const url = `${$BASE_URL}/api/login`;
            //this is the data we send to the server
            const data = { name: username, password: inputPassword};
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            
            if (response.ok) {
                const result = await response.text();
                //the result in text, is the jasonWebToken that now we call the next function with
                saveToken(result);
            } else {
                console.error('Error:', response.status, response.statusText);
                alert("Wrong Credetials");
            }

        }else{
            alert("Wrong Credetials");
        }
    }


    //here we save the recived token to the database and go to the main page after
    async function saveToken(token) {

        const url = `${$BASE_URL}/api/token/add`;
        //here is the data we send to the server
        const data = {token};

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        
        if (response.ok) {
            isLoggedIn.set(true);
            navigate("/mainPage");
        } else {
            console.error('Error:', response.status, response.statusText);
            alert("Failed to send token");
        }
    }
</script>

<div>
    <label for="username">Username:</label>
    <br>
    <input type="text" id="username" bind:value={username}><br><br>

    <label for="password">Password:</label>
    <br>
    <input type="password" id="password" bind:value={inputPassword}><br><br>
</div>

<div>
    <button class="button confirmButton" on:click={redirectToMainPage}>Login</button>
</div>
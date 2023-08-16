<script>
    import { BASE_URL } from "../stores/globalStores";
    import { navigate } from "svelte-navigator";

    let inputEmail;
       const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    

       async function handleSend() {
       
        if(inputEmail && emailFormat.test(inputEmail)){
                
            const url = `${$BASE_URL}/api/forgotPassword`;
        
            const data = { email: inputEmail };
    
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            
            if (res.ok) {
          
                alert(`An email has been sent to ${inputEmail}`);
                navigate("/");
            } else {
                console.error('Error:', res.status, res.statusText);
                const result = await res.text();
                alert(result);
            }

        }else{
            alert("Please insert a valid email");
        }
    }
</script>

<div>
    <h1>
        <p class="title">Forgot Password Page</p>
    </h1>
    <h2>
        <p class="subtitle">Please insert your email</p>
    </h2>
</div>

<div>
    <label for="email">Email:</label>
    <br>
    <input type="text" id="email" bind:value={inputEmail}><br><br>
</div>


<div>
     <button class="button confirmButton" on:click={handleSend}>Send</button>
</div>

<style>
    input{
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
</style>
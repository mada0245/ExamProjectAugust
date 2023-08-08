<script>
    import { BASE_URL } from "../stores/globalStores";
    import { navigate } from "svelte-navigator";

    let inputEmail;
       //this the pattern of email addresses
       const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
        //here we send an email regarding the forgotten passowrd using the email the user has inserted
       async function handleSend() {
        //here we see if there is a input in the email location and vrify if it has an email pattern
        if(inputEmail && emailFormat.test(inputEmail)){
                
            const url = `${$BASE_URL}/api/forgotPassword`;
            //here we send the data with the email to the server
            const data = { email: inputEmail };
    
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            
            if (res.ok) {
                //if the response is ok we sent the email and now we go back to the login page
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
    <label for="email">Email:</label>
    <br>
    <input type="text" id="email" bind:value={inputEmail}><br><br>
</div>


<div>
     <button class="button confirmButton" on:click={handleSend}>Send</button>
</div>
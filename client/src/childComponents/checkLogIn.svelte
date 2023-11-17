<script>
    import { isLoggedIn } from "../stores/globalStores";
    import { navigate } from "svelte-navigator";

    let logged; 

 
    isLoggedIn.subscribe( value => {
      logged = value;
    });

    if(!logged){
        console.log('You are not authorised to do that.');
        navigate('/');
    }

</script>
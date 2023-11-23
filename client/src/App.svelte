<script>
  import { Router, Link, Route } from "svelte-navigator";

  import Login from "./pageComponents/login.svelte";
  import Main from "./pageComponents/main.svelte";
  import ForgotPassword from "./pageComponents/forgotPassword.svelte";
  import RecepiesList from "./pageComponents/recepiesList.svelte";
  import CreateRecepie from "./pageComponents/createRecepie.svelte";
  import TodayMeal from "./pageComponents/todayMeal.svelte";
  import DeleteRecepie from "./pageComponents/deleteRecepie.svelte";

  let isDarkMode = false;

  function changeDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);
  }
</script>

<Router>
  <button class="darkModeButton" on:click={changeDarkMode}
    >{isDarkMode ? "Light" : "Dark"}</button
  >

  <Route path="/">
    <Login />
    <Link to="/forgotPassword">Forgot password</Link>
  </Route>

  <Route path="/forgotPassword">
    <nav class="navBar">
      <Link to="/">Back</Link>
    </nav>
    <ForgotPassword />
  </Route>

  <Route path="/main">
    <nav class="navBar">
      <Link to="/">Log out</Link>
    </nav>
    <Main />
  </Route>

  <Route path="/recepiesList">
    <nav class="navBar">
      <Link to="/main">Back</Link>
      <Link to="/">Log out</Link>
    </nav>
    <RecepiesList />
  </Route>

  <Route path="/createRecepie">
    <nav class="navBar">
      <Link to="/main">Back</Link>
      <Link to="/">Log out</Link>
    </nav>
    <CreateRecepie />
  </Route>

  <Route path="/todayMeal">
    <nav class="navBar">
      <Link to="/main">Back</Link>
      <Link to="/">Log out</Link>
    </nav>
    <TodayMeal />
  </Route>

  <Route path="/deleteRecepie">
    <nav class="navBar">
      <Link to="/main">Back</Link>
      <Link to="/">Log out</Link>
    </nav>
    <DeleteRecepie />
  </Route>
</Router>

<style>
  .navBar {
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    background-color: #f0f0f0;
    padding: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    width: 90%;
  }

  .darkModeButton {
    position: absolute;
    right: 2%;
    width: 5%;
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }

  .darkModeButton:hover {
    color: #535bf2;
  }
</style>

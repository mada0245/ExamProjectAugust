<script>
  import { Router, Link, Route } from "svelte-navigator";

  import LoginPage from "./pageComponents/login.svelte";
  import MainPage from "./pageComponents/main.svelte";
  import ForgotPasswordPage from "./pageComponents/forgotPassword.svelte";
  import RecepiesListPage from "./pageComponents/recepiesList.svelte";
  import CreateRecepiePage from "./pageComponents/createRecepie.svelte";
  import TodayMealPage from "./pageComponents/todayMeal.svelte";
  import DeleteRecepiePage from "./pageComponents/deleteRecepie.svelte";

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
    <LoginPage />
    <Link to="/forgotPassword">Forgot password</Link>
  </Route>

  <Route path="/forgotPassword">
    <nav class="navBar">
      <Link to="/">Back</Link>
    </nav>
    <ForgotPasswordPage />
  </Route>

  <Route path="/main">
    <nav class="navBar">
      <Link to="/">Log out</Link>
    </nav>
    <MainPage />
  </Route>

  <Route path="/recepiesList">
    <nav class="navBar">
      <Link to="/main">Back</Link>
      <Link to="/">Log out</Link>
    </nav>
    <RecepiesListPage />
  </Route>

  <Route path="/createRecepie">
    <nav class="navBar">
      <Link to="/main">Back</Link>
      <Link to="/">Log out</Link>
    </nav>
    <CreateRecepiePage />
  </Route>

  <Route path="/todayMeal">
    <nav class="navBar">
      <Link to="/main">Back</Link>
      <Link to="/">Log out</Link>
    </nav>
    <TodayMealPage />
  </Route>

  <Route path="/deleteRecepie">
    <nav class="navBar">
      <Link to="/main">Back</Link>
      <Link to="/">Log out</Link>
    </nav>
    <DeleteRecepiePage />
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

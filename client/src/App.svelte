<script>
  import { Router, Link, Route } from "svelte-navigator";

  import LoginPage from "./pageComponents/login.svelte";
  import MainPage from "./pageComponents/main.svelte";
  import ForgotPasswordPage from "./pageComponents/forgotPassword.svelte";
  import RecepiesListPage from "./pageComponents/recepiesList.svelte";
  import CreateRecepiePage from "./pageComponents/createRecepie.svelte";
  import TodayMealPage from "./pageComponents/todayMeal.svelte";
  import DeleteRecepiePage from "./pageComponents/deleteRecepie.svelte";

</script>

<Router>

  <Route path="/">
    <LoginPage />
    <Link to="/forgotPasswordPage">Forgot password</Link>
  </Route>

  <Route path="/forgotPasswordPage">
    <nav class="navBar">
      <Link to="/">Back</Link>
    </nav>
    <ForgotPasswordPage />
  </Route>

  <Route path="/mainPage">
    <nav class="navBar">
      <Link to="/">Log out</Link>
    </nav>
    <MainPage />
  </Route>

  <Route path="/recepiesListPage">
    <nav class="navBar">
      <Link to="/mainPage">Back</Link>
      <Link to="/">Log out</Link>
    </nav>
    <RecepiesListPage />
  </Route>

  <Route path="/createRecepiePage">
    <nav class="navBar">
      <Link to="/mainPage">Back</Link>
      <Link to="/">Log out</Link>
    </nav>
    <CreateRecepiePage />
  </Route>

  <Route path="/todayMealPage">
    <nav class="navBar">
      <Link to="/mainPage">Back</Link>
      <Link to="/">Log out</Link>
    </nav>
    <TodayMealPage />
  </Route>

  <Route path="/deleteRecepiePage">
    <nav class="navBar">
      <Link to="/mainPage">Back</Link>
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
  }
  
</style>

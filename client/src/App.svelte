<script>
  import { Router, Link, Route } from "svelte-navigator";
  import LoginPage from "./pages/login.svelte";
  import MainPage from "./pages/main.svelte";
  import ForgotPasswordPage from "./pages/forgotPassword.svelte";
  import RecepiesListPage from "./pages/recepiesList.svelte";
  import CreateRecepie from "./pages/createRecepie.svelte";
  import TodayMealPage from "./pages/todayMeal.svelte";
</script>

<Router>

  <Route path="/">
    <LoginPage />
    <Link to="/forgotPasswordPage">Forgot password</Link>
  </Route>

  <Route path="/forgotPasswordPage">
    <ForgotPasswordPage />
    <Link to="/">Back</Link>
  </Route>

  <Route path="/mainPage">
    <MainPage />
    <Link to="/mainPage/recepiesListPage">Recepeies list</Link>
    <br>
    <Link to="/mainPage/createRecepiePage">Create a new recepie</Link>
    <br>
    <Link to="/mainPage/todayMealPage">Choose a meal</Link>
    <br>
    <Link to="/">Log out</Link>
  </Route>

  <Route path="/mainPage/recepiesListPage">
    <nav>
      <Link to="/mainPage/createRecepiePage" >| Create a new recepie </Link>
      <Link to="/mainPage/todayMealPage">| Choose a meal |</Link>
      <Link to="/"> Log out |</Link>
    </nav>
    <RecepiesListPage />
  </Route>

  <Route path="/mainPage/createRecepiePage">
    <nav>
      <Link to="/mainPage/recepiesListPage">| Recepeies list </Link>
      <Link to="/mainPage/todayMealPage">| Choose a meal |</Link>
      <Link to="/"> Log out |</Link>
    </nav>
    <CreateRecepie />
  </Route>

  <Route path="/mainPage/todayMealPage">
    <nav>
      <Link to="/mainPage/recepiesListPage">| Recepeies list </Link>
      <Link to="/mainPage/createRecepiePage">| Create a new recepie |</Link>
      <Link to="/"> Log out |</Link>
    </nav>
    <TodayMealPage />
  </Route>

</Router>
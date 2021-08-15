import { BrowserRouter as Router, Switch, Route } from "react-router-dom"


import { CountryContextProvider } from "../Store/Context";
import Header from "./Header/Header";
import HomePage from "../Page/Homepage";
import CountryPage from "../Page/CountryPage";

const App = () =>{

  return (
    <>
    <Header />
    <CountryContextProvider>
      <Router >
        <Switch>
          <Route path="/:id">
            <CountryPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </CountryContextProvider>
    </>
  );
}


export default App;
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Header from "./Header/Header";
import HomePage from "../Page/Homepage";
import { CountryContextProvider } from "../Store/Context";

const App = () =>{
  return (
    <>
    <Header />
    <CountryContextProvider>
      <Router >
        <Switch>
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
import React from 'react';
import ReactDOM from 'react-dom';
import Axios from "axios";
import { RequestProvider } from 'react-request-hook';

import App from "./Components/App";
import "./css/style.css";

const axiosInstance = Axios.create({
  baseURL: "https://restcountries.eu/rest/v2/all"
})

ReactDOM.render(
  <RequestProvider value={axiosInstance}>
    <App />
  </RequestProvider>,
  document.getElementById('root')
);

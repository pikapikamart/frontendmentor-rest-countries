import { useContext, useEffect, useState } from "react";

import Navigation from "../Components/Navigation/Navigation";
import Filterbar from "../Components/Navigation/Filterbar";
import Searchbar from "../Components/Navigation/Searchbar";
import CountryContext from "../Store/Context";
import Countries from "../Components/Countries/Countries";
import Paginate from "../Components/Countries/Paginate";


const HomePage = () =>{
  const countryContextData = useContext(CountryContext);
  const [ countries, setCountries ] = useState([]);
  const [ filter, setFilter ] = useState("None");
  const [ paginateLimit, setPaginateLimit ] = useState(20);
  const [ searchCountry, setSearchCountry ] = useState("");

  const paginateInverse = <Paginate paginateLimit={paginateLimit} setPaginateLimit={setPaginateLimit} filter={filter} />

  const processCountryToDisplay = () =>{
    if ( searchCountry ) {
      const filterCountries = countries.filter(country => country.lowered.includes(searchCountry));
      return filterCountries;
    } else {
      return countries;
    }
  }
  
  useEffect(() =>{
    if ( countryContextData && countryContextData.loaded ) {
      setCountries(countryContextData.countryData.countries);
    }
  }, [ countryContextData ])

  return (
    <main className="homepage">
      <h1 className="visually-hidden">Countries from around the world</h1>
      <Navigation>
        <Searchbar setSearchCountry={setSearchCountry} />
        <Filterbar setFilter={setFilter} setPaginateLimit={setPaginateLimit} />
      </Navigation>
      {countryContextData.loaded && <Countries 
                                      filter={filter} 
                                      paginateLimit={paginateLimit}
                                      paginateInverse={paginateInverse}
                                      currentCountries={processCountryToDisplay()}
                                      searchCountry={searchCountry}
                                       />}
    </main>
  );
}


export default HomePage;
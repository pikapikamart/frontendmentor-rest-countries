import { useContext, useState, useEffect } from "react";

import CountryContext from "../Store/Context";
import Navigation from "../Components/Navigation/Navigation";
import Filterbar from "../Components/Navigation/Filterbar";
import Searchbar from "../Components/Navigation/Searchbar";
import Countries from "../Components/Countries/Countries";
import Paginate from "../Components/Countries/Paginate";


const HomePage = () =>{
  const countryContextData = useContext(CountryContext);
  const { countryData, loaded } = countryContextData;
  const [ filter, setFilter ] = useState("None");
  const [ paginateLimit, setPaginateLimit ] = useState(20);
  const [ searchCountry, setSearchCountry ] = useState("");

  const paginateInverse = <Paginate setPaginateLimit={setPaginateLimit} />

  const processCountryToDisplay = () =>{
    if ( searchCountry ) {
      const filterCountries = countryData.countries.filter(country => country.lowered.includes(searchCountry));
      return filterCountries;
    } else {
      return countryData.countries || [];
    }
  }

  useEffect(() => {
    document.body.focus();
    const timeout = setTimeout(() => document.body.blur(), 100);
    return () => clearTimeout(timeout);
  }, [])

  return (
    <main className="homepage" >
      <div className="homepage__maxwidth">
        <h1 className="visually-hidden">Countries from around the world</h1>
        <Navigation>
          <Searchbar setSearchCountry={setSearchCountry} currentCountries={processCountryToDisplay()} />
          <Filterbar setFilter={setFilter} setPaginateLimit={setPaginateLimit} />
        </Navigation>
        {loaded && <Countries 
                    filter={filter} 
                    paginateLimit={paginateLimit}
                    paginateInverse={paginateInverse}
                    currentCountries={processCountryToDisplay()}
                    searchCountry={searchCountry}
                     />}
      </div>
    </main>
  );
}


export default HomePage;
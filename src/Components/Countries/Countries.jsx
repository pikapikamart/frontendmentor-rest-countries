import { useContext } from "react";

import Country from "./Country";
import CountryContext from "../../Store/Context";


const Countries = ({ filter, paginateLimit, paginateInverse, currentCountries, searchCountry }) =>{
  const countryContextData = useContext(CountryContext);
  const { countryFiltersIndex } = countryContextData.countryData;
  
  const processCountry = ( data, index ) =>(
    <Country 
      country={data} 
      key={data.id} 
      index={index} 
      paginateLimit={paginateLimit}
    />
  )

  const renderCountries = () =>{
    let countriesToRender;
    if ( filter==="None" ) {
      countriesToRender =  currentCountries.slice(0, paginateLimit).map((data, index) =>processCountry(data, index));
    } else if ( searchCountry ) {
      const filterArray = currentCountries.filter(country => country.region===filter);
      countriesToRender = filterArray.slice(0, paginateLimit).map(( data, index ) => processCountry(data, index));
    } else {
      const filterArray = countryFiltersIndex[filter];
      const countryArray = filterArray.map(countryIndex => currentCountries[countryIndex]);
      countriesToRender =  countryArray.slice(0, paginateLimit).map(( data, index ) =>processCountry(data, index,));
    } 
    return countriesToRender;
  }

  return (
    <div className="countries">
      <div className="country-grid">
        {renderCountries()}
      </div>
      { renderCountries().length >= paginateLimit && paginateInverse }
    </div>
  );
}


export default Countries;
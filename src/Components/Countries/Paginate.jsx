import { useRef, useEffect, useContext, useState } from "react"

import CountryContext from "../../Store/Context";

const Paginate = ({ setPaginateLimit, paginateLimit, filter }) =>{
  const countryContextData = useContext(CountryContext);
  const { countryData: { countryFiltersIndex }} = countryContextData;
  const [ paginated, setPaginated ] = useState(false);
  const paginateRegion = useRef();

  const handlePaginateCountries = () => setPaginated(true);;

  useEffect(() =>{
    // For ARIAS
    if ( paginated ) {
      if ( filter!=="None" && countryFiltersIndex[filter].length < paginateLimit ) {
        paginateRegion.current.textContent = "No more countries to load.";
      } else {
        setPaginateLimit(prev => prev+20);
        paginateRegion.current.textContent = "Added 20 more countries.";
      }
      setTimeout(() =>{
        paginateRegion.current.textContent = "";
      }, 100)
      setPaginated(false);
    }
  }, [ filter, paginated, paginateLimit, setPaginateLimit, countryFiltersIndex ])

  return(
    <div className="paginate">
      <div
        className="paginate__aria-live visually-hidden" 
        aria-live="polite"
        ref={paginateRegion}>
      </div>
      <button
        aria-label="load 20 more countries" 
        className="paginate__toggler"
        onClick={handlePaginateCountries}>
          Load More
      </button>
    </div>
  );
}


export default Paginate;
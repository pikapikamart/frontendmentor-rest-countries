import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useContext } from "react";

import CountryContext from "../Store/Context";
import VisitedCountry from "./VisitedCountry";

const CountryPage = () =>{
  const { id } = useParams();
  const countryPageMain = useRef();
  const { loaded } = useContext(CountryContext);


  useEffect(() =>{
    window.scrollTo(0, 0)
    const timeout = setTimeout(() => countryPageMain.current.focus(), 100);
    return () => clearTimeout(timeout);
  }, [ id ])
  
  return (
    <main className="country-page" tabIndex="-1" ref={countryPageMain}>
      <div>
        <Link to="/" className="country-page__back">
          <svg aria-hidden xmlns="http://www.w3.org/2000/svg" width="15.882" height="10" viewBox="0 0 15.882 10">
            <path id="XMLID_28_" d="M15.159,79.167H2.464l2.377-2.744a.927.927,0,0,0,0-1.178.656.656,0,0,0-1.021,0L.211,79.411a.927.927,0,0,0,0,1.179l3.61,4.167a.656.656,0,0,0,1.021,0,.927.927,0,0,0,0-1.178L2.464,80.834h12.7a.842.842,0,0,0,0-1.667Z" transform="translate(0 -75)"/>
          </svg>
          Back
          <span className="visually-hidden"> to homepage</span>
        </Link>        
      </div>
      {loaded && <VisitedCountry countryId={id} />}
    </main>
  );
}


export default CountryPage;
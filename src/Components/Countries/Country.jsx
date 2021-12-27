import { Link } from "react-router-dom";
import { useEffect, useRef, memo } from "react";


const Country = ({ country, index, paginateLimit }) =>{
  const { flag, name, population, region, capital } = country;
  const countryLink = useRef();
  
  useEffect(() =>{
    if ( paginateLimit!==20 && index===paginateLimit-20) {
      countryLink.current.focus();
    }
  }, [ index, paginateLimit ])

  return (
    <article className="country">
      <header>
        <Link to={`/${name}`} ref={countryLink} className="country__link">
          <img className="country__flag" src={flag} alt={name} />
        </Link>
        <h2 className="country__name">{name}</h2>
      </header>
      <div className="country__information-container">
        <ul className="country__information-block">
          <li className="country__information">
            <span>Population:</span>
            {population.toLocaleString()}
          </li>
          <li className="country__information">
            <span>Region:</span>
            {region}
          </li>
          <li className="country__information">
            <span>Capital:</span>
            {capital}
          </li>
        </ul>
      </div>
    </article>
  );
}


export default memo(Country);
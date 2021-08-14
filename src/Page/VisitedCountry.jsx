import { useContext } from "react";
import { Link } from "react-router-dom";

import CountryContext from "../Store/Context";

const VisitedCountry = ({ countryId }) =>{
  const { countryData } = useContext(CountryContext);
  const { countryNameIndex, countries, countryIndex } = countryData;
  const countryInformations = countries[countryNameIndex[countryId]];
  
  const renderBorderCountries = () =>{
    const borders = countryInformations.borders.map(border => countryIndex[border].name);
    const processedBorders = borders.map( border =>{
      let checkBorderName;
      if ( border.includes("(") ) {
        checkBorderName = border.slice(0, border.indexOf("(")-1);
      } else {
        checkBorderName = border;
      }
      return (
        <li className="country-page__border" key={border}>
          <Link to={border}>
            {checkBorderName}
          </Link>
        </li>
      )
    });
    return processedBorders;
  }

  return (
    <article className="country-page__article">
      <header className="country-page__header">
        <div className="country-page__img-holder">
          <img src={countryInformations.flag} alt={countryId} className="country-page__image" />
        </div>
        <h2 className="country-page__name">{countryId}</h2>
      </header>
      <section className="country-page__container">
        <h3 className="visually-hidden">Country Information</h3>
        <ul className="country-page__informations-holder">
          <li className="country-page__information">
            <span>Native Name:</span>
            {countryInformations.nativeName}
          </li>
          <li className="country-page__information">
            <span>Population:</span>
            {countryInformations.population.toLocaleString()}
          </li>
          <li className="country-page__information">
            <span>Region:</span>
            {countryInformations.region}
          </li>
          <li className="country-page__information">
            <span>Sub Region:</span>
            {countryInformations.subRegion}
          </li>
          <li className="country-page__information">
            <span>Capital:</span>
            {countryInformations.capital}
          </li>
          <li className="country-page__information">
            <span>Top Level Domain:</span>
            {countryInformations.domain}
          </li>
          <li className="country-page__information">
            <span>Currencies:</span>
            {countryInformations.currencies}
          </li>
          <li className="country-page__information">
            <span>Languages:</span>
            {countryInformations.languages.reduce(( accu, curr )=>accu.concat(curr.name), []).join(",")}
          </li>
        </ul>
        <div>
          <h3>Border Countries: </h3>
          <ul className="country-page__borders">
            {renderBorderCountries()}
          </ul>
        </div>
      </section>
    </article>
  );
}


export default VisitedCountry;
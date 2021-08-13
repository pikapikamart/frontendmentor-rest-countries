import { createContext, useState, useEffect } from "react";
import { useResource } from "react-request-hook";


const CountryContext = createContext({
  countryData: {
    countryIndex: {},
    countries: [],
    countryFiltersIndex: {},
  },
  countryApi: {},
  loaded: false
});

export default CountryContext;
  

const countryApiOptions =() =>({
  method: "get",
  url: "https://restcountries.eu/rest/v2/all"
});


const CountryContextProvider = props =>{
  const [ countryApiData, getCountryApiData ] = useResource( () =>countryApiOptions());
  const [ countryData, setCountryData ] = useState({});
  const [ countryLoaded, setCountryLoaded ] = useState(false);
 
  useEffect(getCountryApiData, [ getCountryApiData ]);

  useEffect(() =>{
    if ( countryApiData && countryApiData.data ) {
      const countryIndexHolder = {};
      const countryProcessedDataHolder = [];
      const countryFilterIndexHolder = {
        Africa: [],
        Americas: [],
        Asia: [],
        Europe: [],
        Oceania: [],
        Polar: [],
        Islands: []
      };
    
      countryApiData.data.forEach(( data, index ) =>{
        countryIndexHolder[data.alpha3Code] = {
          index,
          name: data.name
        }
    
        const processedData = {
          name: data.name,
          domain: data.topLevelDomain[0],
          alphaCode: data.alpha3Code,
          capital: data.capital,
          region: data.region,
          subRegion: data.subRegion,
          population: data.population,
          borders: data.borders,
          nativeName: data.nativeName,
          currencies: data.currencies[0].name,
          languages: data.languages[0].name,
          flag: data.flag,
          id: data.name,
          lowered: data.name.toLowerCase()
        }
        if (data.region) {
          countryFilterIndexHolder[data.region].push(index);
        } else {
          countryFilterIndexHolder["Islands"].push(index);
        }
        countryProcessedDataHolder.push(processedData);
      })
      
      setCountryLoaded(true);
      setCountryData({
        countryIndex: countryIndexHolder,
        countries: countryProcessedDataHolder,
        countryFiltersIndex: countryFilterIndexHolder,
      });
    }
    

  }, [ countryApiData ]);

  const context = {
    countryApi: countryApiData,
    countryData: countryData,
    loaded: countryLoaded
  }

  return (
    <CountryContext.Provider value={context}>
      {props.children}
    </CountryContext.Provider>
  )
}


export { CountryContextProvider };
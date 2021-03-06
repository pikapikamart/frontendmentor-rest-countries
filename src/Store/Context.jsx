import { createContext, useState, useEffect } from "react";
import { useResource } from "react-request-hook";


const CountryContext = createContext({
  countryData: {
    countryIndex: {},
    countries: [],
    countryFiltersIndex: {},
    countryNameIndex: {}
  },
  countryApi: {},
  loaded: false
});

export default CountryContext;
  

const countryApiOptions =() =>({
  method: "get",
  url: "https://restcountries.com/v2/all"
});


const CountryContextProvider = props =>{
  const [ countryApiData, getCountryApiData ] = useResource( () =>countryApiOptions());
  const [ countryData, setCountryData ] = useState({});
  const [ countryLoaded, setCountryLoaded ] = useState(false);
 
  useEffect(getCountryApiData, [ getCountryApiData ]);

  useEffect(() =>{
    if ( countryApiData && countryApiData.data ) {
      const countryIndexHolder = {};
      const countryNameIndexHolder = {};
      const countryProcessedDataHolder = [];
      const countryFilterIndexHolder = {};

      countryApiData.data.forEach(( data, index ) =>{
        countryIndexHolder[data.alpha3Code] = {
          index,
          name: data.name
        }

        countryNameIndexHolder[data.name] = index;
        const processedData = {
          name: data.name,
          domain: data.topLevelDomain[0],
          alphaCode: data.alpha3Code,
          capital: data.capital,
          region: data.region,
          subRegion: data.subregion,
          population: data.population,
          borders: data?.borders ?? [],
          nativeName: data.nativeName,
          currencies: data.currencies?.[0].name,
          languages: data.languages,
          flag: data.flags.svg,
          id: data.name,
          lowered: data.name.toLowerCase()
        }

        if ( countryFilterIndexHolder.hasOwnProperty(data.region)) {
          countryFilterIndexHolder[data.region].push(index)
        } else {
          countryFilterIndexHolder[data.region] = [index];
        }
  
        countryProcessedDataHolder.push(processedData);
      })
      
      setCountryLoaded(true);
      setCountryData({
        countryIndex: countryIndexHolder,
        countries: countryProcessedDataHolder,
        countryFiltersIndex: countryFilterIndexHolder,
        countryNameIndex: countryNameIndexHolder
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
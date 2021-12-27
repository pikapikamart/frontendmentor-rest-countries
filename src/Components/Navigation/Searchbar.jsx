import { useRef, useState, useEffect,  memo } from "react";


const Searchbar = ({ setSearchCountry, currentCountries }) =>{
  const [ hasSearched, setHasSearched ] = useState(false);
  const searchAriaRegion = useRef();
  const searchBar = useRef();

  useEffect(() =>{
    if ( hasSearched ) {
      searchAriaRegion.current.textContent = `Search has found ${currentCountries.length} ${currentCountries.length<1? "country":"countries"}`;
      setHasSearched(false);
    }
  }, [ hasSearched, currentCountries.length ]);

  const handleSearchInput = event =>{
    if ( event.target.value ) {
      event.target.classList.add("typing");
    } else {
      event.target.classList.remove("typing");
    }
  }

  const handleSubmitSearchCountry = event =>{
    event.preventDefault();
    const searchValue = event.target.country.value.trim().toLowerCase();
    setSearchCountry(searchValue);
    setHasSearched(true);
  }

  const handleResetSearchCountry = () =>{
    setSearchCountry("");
    searchAriaRegion.current.textContent = "searchbar resetted";
    searchBar.current.value = "";
    searchBar.current.classList.remove("typing");
  }

  return (
    <form className="searchbar" onSubmit={handleSubmitSearchCountry}>
      <div aria-live="polite" className="visually-hidden" ref={searchAriaRegion} />
      <div className="searchbar__wrapper">
        <input className="searchbar__input"
          type="text"
          name="country" 
          id="country"
          onChange={handleSearchInput}
          autoComplete="off"
          ref={searchBar}/>
        <label className="searchbar__label" htmlFor="country">
          Search for a country
          <span className="visually-hidden"> and press enter to search.</span>
        </label>
        <svg className="searchbar__icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14.001" viewBox="0 0 14 14.001">
          <g id="magnifying-glass" transform="translate(-0.001 0)">
            <path id="Path_3" data-name="Path 3" d="M9.35,1.6A5.479,5.479,0,1,0,8.6,9.971a1.153,1.153,0,0,0,.313.581l3.11,3.11a1.157,1.157,0,0,0,1.637-1.637l-3.11-3.111a1.157,1.157,0,0,0-.58-.312A5.484,5.484,0,0,0,9.35,1.6ZM8.368,8.368a4.09,4.09,0,1,1,0-5.784A4.094,4.094,0,0,1,8.368,8.368Z" transform="translate(0 0)" fill="#858585"/>
          </g>
        </svg>
        <button type="button" className="searchbar__reset" onClick={handleResetSearchCountry}>
          <span className="visually-hidden">reset search bar</span>
          <svg aria-hidden className="searchbar__reset-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="12.966" viewBox="0 0 14 12.966">
            <g id="reset" transform="translate(0 -17.983)">
              <path id="Path_4" data-name="Path 4" d="M7.518,17.983A6.462,6.462,0,0,0,1.653,21.7L.922,20.177,0,20.622l1.518,3.151,3.151-1.518-.444-.922-1.641.791a5.462,5.462,0,1,1,.47,5.486l-.837.59a6.483,6.483,0,1,0,5.3-10.216Z" transform="translate(0 0)"/>
            </g>
          </svg>
        </button>
      </div>
    </form>
  );
}


export default memo(Searchbar);
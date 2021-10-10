import { useState, useRef, useEffect, memo, useContext } from "react";

import CountryContext from "../../Store/Context";

const Filterbar = ({ setFilter, setPaginateLimit }) =>{
  const countries = useContext(CountryContext);
  const { countryData: {countryFiltersIndex} } = countries;
  const [ ariaExpanded, setAriaExpanded ] = useState(false);
  const [ selectedRegion, setSelectedRegion ] = useState("None");
  const filterBarToggler = useRef();
  const filterBarSelections = useRef();

  const handleFilterButtonTrigger = () => setAriaExpanded(prev => !prev);

  useEffect(() =>{
    if ( ariaExpanded ) {
      const timeout = setTimeout(() => filterBarSelections.current.focus(), 100);
      return () => clearTimeout(timeout);
    }
  }, [ ariaExpanded ]);

  const resetRegionSelections = () =>{
    Array.from(filterBarSelections.current.children).forEach(selection => {
      selection.classList.remove("selected");
      selection.setAttribute("aria-selected", "false");
    });
  }

  const handleRegionSelecting = region =>{
    resetRegionSelections();
    region.classList.add("selected");
    filterBarSelections.current.setAttribute("aria-activedescendant", region.id);
  }

  const regionSelectionsCompleted = region =>{
    setAriaExpanded(false);
    setSelectedRegion(region.textContent);
    setPaginateLimit(20);
    setFilter(region.textContent);
    handleRegionSelecting(region);
    filterBarToggler.current.focus();
    region.setAttribute("aria-selected", "true");
  }

  const handleKeyboardRegionSelections = event =>{
    event.preventDefault();
    const { key } = event;
    if ( key==="ArrowDown" || key==="ArrowUp" || key==="Enter") {
      const activeSelectedRegionId = filterBarSelections.current.getAttribute("aria-activedescendant");
      const activeSelectedRegionElement = filterBarSelections.current.querySelector(`#${activeSelectedRegionId}`);
      const newSelectedRegion = key==="Enter"? activeSelectedRegionElement:
                                key==="ArrowDown"? activeSelectedRegionElement.nextElementSibling : activeSelectedRegionElement.previousElementSibling;
      if ( activeSelectedRegionElement===newSelectedRegion ) {
        regionSelectionsCompleted(newSelectedRegion);
      }else if ( newSelectedRegion ) {
        handleRegionSelecting(newSelectedRegion);
      }
    }
  }

  const handleClickRegionSelection = event =>{
    const selectedRegionItem = event.target.closest("li");
    if ( !selectedRegionItem ) return;
    regionSelectionsCompleted(selectedRegionItem);
  }

  const renderFilterBarRegions = () =>{
    const filters = [];
    for ( const filter in countryFiltersIndex ) {
      filters.push(<li className="filterbar__option" aria-selected="false" role="option" id={filter.replace(/\s+/g, '')} key={filter}>{filter}</li>)
    }
    return filters;
  }

  return (
    <div className="filterbar">
      <div className="filterbar__container">
        <button 
          className="filterbar__toggler"
          aria-haspopup="listbox"
          aria-expanded={ ariaExpanded }
          onClick={ handleFilterButtonTrigger }
          ref={ filterBarToggler }
        >
            {selectedRegion!=="None"? selectedRegion:"Filter by Region"}
        </button>
        <ul 
          className="filterbar__selections"
          role="listbox"
          aria-activedescendant="Africa"
          tabIndex="-1"
          ref={ filterBarSelections }
          onKeyDown={ handleKeyboardRegionSelections }
          onClick={ handleClickRegionSelection }
        >
          {renderFilterBarRegions()}
          <li className="filterbar__option" aria-selected="false" role="option" id="None">None</li>
        </ul>
      </div>
    </div>
  );
}


export default memo(Filterbar);
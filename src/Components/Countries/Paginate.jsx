import { useRef, useEffect, useState } from "react"


const Paginate = ({ setPaginateLimit }) =>{
  const [ , setUpdate ] = useState(false);
  const [ paginated, setPaginated ] = useState(false);
  const paginateRegion = useRef();

  const handlePaginateCountries = () => setPaginated(true);;
  
  useEffect(() =>{
    setUpdate(true);
  }, [])

  useEffect(() =>{
    if ( paginated ) {
      paginateRegion.current.textContent = `Loaded more countries`;
      setTimeout(() =>{
        paginateRegion.current.textContent = "";
        setPaginateLimit(prev => prev+20);
      }, 100)
      setPaginated(false);
    }
  }, [ paginated, setPaginateLimit ])

  return(
    <div className="paginate">
      <div
        className="paginate__aria-live visually-hidden" 
        aria-live="polite"
        ref={paginateRegion}
        >
      </div>
      <button
        aria-label="load more countries" 
        className="paginate__toggler"
        onClick={handlePaginateCountries}>
          Load More
      </button>
    </div>
  );
}


export default Paginate;
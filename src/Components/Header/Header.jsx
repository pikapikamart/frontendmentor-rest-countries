import { useState, useEffect } from "react";


const Header = () =>{
  const [ lightMode, setLightMode ] = useState(true);

  const handleChangeColorMode = () => setLightMode(prev => !prev);

  useEffect(() =>{
    const body = document.querySelector("body");
    if ( lightMode ) {
      body.classList.remove("darkmode");
    } else {
      body.classList.add("darkmode");
    }
  }, [ lightMode ])

  return (
    <header className='header'>
      <div className="header__wrapper">
        <h2 className="header__landmark">
          Where in the world?
        </h2>
        <fieldset className="colormodes">
          <legend className="visually-hidden">Color mode selections</legend>
          <input 
            className="colormodes__input" 
            type="radio" 
            name="colormode" 
            id="lightmode" 
            aria-label="lightmode" 
            defaultChecked
            onChange={handleChangeColorMode}/>
          <label className="colormodes__toggler" htmlFor="lightmode"></label>
          <input 
            className="colormodes__input" 
            type="radio" name="colormode" 
            id="darkmode" 
            onChange={handleChangeColorMode}/>
          <label className="colormodes__toggler colormodes__last" htmlFor="darkmode">
            <svg className="colormodes__icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
              <g id="moon" transform="translate(0 -0.001)">
                <path id="Path_1" data-name="Path 1" d="M27.792,24.121a6.063,6.063,0,0,1-1.349,2.027,6.192,6.192,0,0,1-8.757-8.757,6.063,6.063,0,0,1,2.027-1.349,6.2,6.2,0,0,0,8.08,8.08Z" transform="translate(-15.335 -15.497)" fill="#fff"/>
                <path id="Path_2" data-name="Path 2" d="M4.913.487A.539.539,0,0,0,4.377,0a.527.527,0,0,0-.183.035L4.161.048,4.141.055A6.587,6.587,0,0,0,1.967,1.511a6.734,6.734,0,0,0,9.523,9.524,6.586,6.586,0,0,0,1.453-2.168c0-.008.006-.017.009-.025s.009-.024.013-.035a.522.522,0,0,0,.022-.071c0-.012,0-.025,0-.038A.549.549,0,0,0,13,8.624a.541.541,0,0,0-.242-.451l-.014-.008a.5.5,0,0,0-.177-.072h0a.52.52,0,0,0-.1-.01h-.007a.543.543,0,0,0-.135.02l-.035.011c-.01,0-.02,0-.03.009a5.619,5.619,0,0,1-2.143.42A5.654,5.654,0,0,1,4.879.75c0-.012.007-.024.011-.035S4.895.7,4.9.688A.541.541,0,0,0,4.919.545s0,0,0,0h0C4.919.523,4.915.5,4.913.487Zm5.194,9.139a6.785,6.785,0,0,0,1.249-.116A5.649,5.649,0,1,1,2.734,2.276a5.593,5.593,0,0,1,.756-.631,6.737,6.737,0,0,0,6.617,7.981Z" transform="translate(0 0)"/>
              </g>
            </svg>
            Dark Mode
          </label>
        </fieldset>
      </div>
    </header>
  );
}


export default Header;
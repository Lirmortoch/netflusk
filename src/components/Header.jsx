import { Link } from "react-router-dom";

import Dropdown from "./Dropdown/Dropdown.jsx";

export default function Header({}) {
  return (
    <header className="header">
      <div className="header__logo logo">
        Netflusk
      </div>

      <nav className="header__nav header-nav">
        <Dropdown 
          dropdownBtn={<button>People</button>}
          dropdownContentStyles=""
          dropdownStyles=""
          dropdownType='hover'
          >
            <>
              <Link to={``}>Popular</Link>
            </>
        </Dropdown>
        
        <Dropdown 
          dropdownBtn={<button>Awards</button>}
          dropdownContentStyles=""
          dropdownStyles=""
          dropdownType='hover'
          >
            <>
              <Link to={``}>Popular</Link>
              <Link to={``}>Upcoming</Link>
            </>
        </Dropdown>

        <Link to={``}>Search</Link>
      </nav>
    </header>
  )
}
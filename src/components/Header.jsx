import { Link } from "react-router-dom"

import Dropdown from "./Dropdown"

export default function Header({}) {
  return (
    <header className="header">
      <div className="header__logo logo">
        Netflusk
      </div>

      <nav className="header__nav header-nav">
        <Dropdown 
          dropdownBtn={<button>People</button>}
          dropdownContentStyles={''}
          dropdownType={'hover'}
          >
            <div>
              <Link to={``}>Popular</Link>
            </div>
        </Dropdown>
        
        <Dropdown 
          dropdownBtn={<button>Awards</button>}
          dropdownContentStyles={''}
          dropdownType={'hover'}
          >
            <div>
              <Link to={``}>Popular</Link>
              <Link to={``}>Upcoming</Link>
            </div>
        </Dropdown>
      </nav>
    </header>
  )
}
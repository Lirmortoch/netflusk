import { Link } from "react-router-dom"

import HoverDropdown from "./HoverDropdown"

export default function Header({}) {
  return (
    <header className="header">
      <div className="header__logo logo">
        Netflusk
      </div>

      <nav className="header__nav header-nav">
        <HoverDropdown 
          dropdownBtn={<button>People</button>}
          dropdownContentStyles={''}
          >
            <div>
              <Link to={``}>Popular</Link>
            </div>
        </HoverDropdown>
        
        <HoverDropdown 
          dropdownBtn={<button>Awards</button>}
          dropdownContentStyles={''}
          >
            <div>
              <Link to={``}>Popular</Link>
              <Link to={``}>Upcoming</Link>
            </div>
        </HoverDropdown>
      </nav>
    </header>
  )
}
import { Link } from "react-router-dom";

import Dropdown from "../ui/Dropdown/Dropdown.jsx";

export default function NavBar() {
  return (
    <nav className="header__nav header-nav">
      <Link to={`/`} className="header-nav__links">Home</Link>
      <Link to={``} className="header-nav__links">Discover</Link>


      {/* Later
      <Link to={``} className="header-nav__links">Search</Link>
      <Dropdown 
        dropdownBtn={{text: 'People', classes: "links__button",}}
        dropdownContentStyles="dropdown-styles-1"
        dropdownStyles="header-nav__links links dropdown"
        dropdownType='hover'
        >
          <ul className="links__list link-list">
            <li className="link-list__item">
              <Link to={``}>Popular</Link>
            </li>
          </ul>
      </Dropdown> */}
    </nav>
  );
}
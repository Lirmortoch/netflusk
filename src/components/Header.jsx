import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setTheme } from "../store/appReducer.js";

import Dropdown from "./dropdown/Dropdown.jsx";
import ThemeSwitcher from './ThemeSwitcher.jsx';

// Main navigation bar
function NavBar() {
  return (
    <nav className="header__nav header-nav">
      <Dropdown 
        dropdownBtn={<button>People</button>}
        dropdownContentStyles=""
        dropdownStyles=""
        dropdownType='hover'
        >
          <ul>
            <li>
              <Link to={``}>Popular</Link>
            </li>
          </ul>
      </Dropdown>
      
      <Dropdown 
        dropdownBtn={<button>Awards</button>}
        dropdownContentStyles=""
        dropdownStyles=""
        dropdownType='hover'
        >
          <ul>
            <li>
              <Link to={``}>Popular</Link>
            </li>
            <li>
              <Link to={``}>Upcoming</Link>
            </li>
          </ul>
      </Dropdown>

      <Link to={``}>Search</Link>
    </nav>
  );
}

// Main toolbar
function Toolbar() {
  return (
    <ul className="header__toolbar header-toolbar">
      <li>
        <ThemeSwitcher />
      </li>
    </ul>
  );
}

export default function Header({}) {
  return (
    <header className="header">
      <div className="header__logo logo">
        Netflusk
      </div>

      <NavBar />

      <Toolbar />
    </header>
  )
}
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setTheme } from "../store/appReducer.js";

import Dropdown from "./Dropdown/Dropdown.jsx";

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

function ThemeSwitcher() {
  const dispatch = useDispatch();

  const themeButton = (
    <button>
      <div>
        
      </div>
    </button>
  );
  const themeList = (
    <ul>
      <li>
        <span>
          <button>
            <div></div>
            <p>Light</p>
          </button>
        </span>
        <span></span>
      </li>
      <li>
        <span>
          <button>
            <div></div>
            <p>Dark</p>
          </button>
        </span>
        <span></span>
      </li>
      <li>
        <span>
          <button>
            <div></div>
            <p>System</p>
          </button>
        </span>
        <span></span>
      </li>
    </ul>
  );
  
  return (
    <Dropdown 
      dropdownBtn={themeButton}
      dropdownContentStyles=""
      dropdownStyles=""
      dropdownType='click'
      >
        {themeList}
    </Dropdown>
  );
}
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
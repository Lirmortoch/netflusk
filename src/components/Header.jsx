import { Link } from "react-router-dom";

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
  const themeButton = (<></>);
  const themeList = (<></>)
  
  return (
    <Dropdown 
      dropdownBtn={<button>Themes</button>}
      dropdownContentStyles=""
      dropdownStyles=""
      dropdownType='click'
      >
        <ul>
          <li>
            <span>
              <div>
                <div></div>
                <p></p>
              </div>
            </span>
            <span></span>
          </li>
          <li>
            <span>
              <div>
                <div></div>
                <p></p>
              </div>
            </span>
            <span></span>
          </li>
          <li>
            <span>
              <div>
                <div></div>
                <p></p>
              </div>
            </span>
            <span></span>
          </li>
        </ul>
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
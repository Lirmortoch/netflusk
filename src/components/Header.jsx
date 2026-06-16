import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Dropdown from "./dropdown/Dropdown.jsx";
import ThemeSwitcher from './ThemeSwitcher.jsx';

// Main navigation bar
function LinksButton({ text }) {
  return (
    <button className="links__button dropdown__button">{text}</button>
  );
}

function NavBar() {
  return (
    <nav className="header__nav header-nav">
      <Dropdown 
        dropdownBtn={<LinksButton text='People' />}
        dropdownContentStyles="dropdown-styles-1"
        dropdownStyles="header-nav__links links dropdown"
        dropdownType='hover'
        >
          <ul className="links__list link-list">
            <li className="link-list__item">
              <Link to={``}>Popular</Link>
            </li>
          </ul>
      </Dropdown>
      
      <Dropdown 
        dropdownBtn={<LinksButton text='Awards' />}
        dropdownContentStyles="dropdown-styles-1"
        dropdownStyles="header-nav__links links dropdown"
        dropdownType='hover'
        >
          <ul className="links__list link-list">
            <li className="link-list__item">
              <Link to={``}>Popular</Link>
            </li>
            <li className="link-list__item">
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
      <li className="heder-toolbar__item">
        <ThemeSwitcher />
      </li>
    </ul>
  );
}

export default function Header({}) {
  return (
    <header className="header">
      <div className="header__logo logo">
        <h1>Netflusk</h1>
      </div>

      <NavBar />

      <Toolbar />
    </header>
  )
}
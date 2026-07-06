import { useSelector, useDispatch } from "react-redux";

import { handleSetTheme } from "../../store/appReducer.js";

import Dropdown from "../ui/dropdown/Dropdown.jsx";

import { wordToRegularCase } from '../../utils/utils.js'

import { SunIcon, MoonIcon, SystemSettingsIcon } from "./Icons.jsx";

// Theme switcher
function ThemeButton({icon}) {
  return (
    <div>
      {icon}
    </div>
  );
}
export default function ThemeSwitcher() {
  const theme = useSelector(({ appSettings }) => appSettings.theme);
  const dispatch = useDispatch();

  const themeIcons = {
    'light': <SunIcon />,
    'dark': <MoonIcon />,
    'system': <SystemSettingsIcon />,
  }
  const themesList = Object.keys(themeIcons);

  const themeList = (
    <div>
      <ul className="theme-switcher__list themes-list">
        {themesList.map((item, i) => (
          <li key={i + item[0]} className={`themes-list__item${item === theme ? ' current' : ''}`}>
            <button onClick={() => dispatch(handleSetTheme(item))} className="theme-item">
              <div className="theme-item__icon">{themeIcons[item]}</div>
              <p className="theme-item__text">{wordToRegularCase(item)}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  
  return (
    <Dropdown 
      dropdownBtn={{ classes: "theme-switcher__button", text: <ThemeButton icon={themeIcons[theme]} />}}
      dropdownStyles="dropdown theme-switcher drop-on-middle"
      dropdownContentStyles="dropdown-styles-2 dropdown-styles-arrow"
      dropdownType='click'
      isSmart={true}
      >
        {themeList}
    </Dropdown>
  );
}
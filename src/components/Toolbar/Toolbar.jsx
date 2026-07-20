import ProfileTools from './ProfileTools.jsx';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher.jsx';

export default function Toolbar() {
  return (
    <ul className="header__toolbar header-toolbar">
      <li className="header-toolbar__item toolbar-button">
        <ThemeSwitcher />
      </li>
      <li className="header-toolbar__item toolbar-button">
        <ProfileTools />
      </li>
    </ul>
  );
}
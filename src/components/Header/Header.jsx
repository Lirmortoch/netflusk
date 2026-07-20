import NavBar from "./NavBar";
import Toolbar from "../Toolbar/Toolbar";

export default function Header({}) {
  return (
    <header className="header">
      <div className="header__logo logo">
        <h1>
          <span>Net</span>
          <span>flux</span>
        </h1>
      </div>

      <NavBar />

      <Toolbar />
    </header>
  )
}
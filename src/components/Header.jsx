import HoverDropdown from "./HoverDropdown"

export default function Header({}) {
  return (
    <header className="header">
      <div className="header__logo logo">
        Netflusk
      </div>

      <nav className="header__nav header-nav">
        <HoverDropdown>
          
        </HoverDropdown>
      </nav>
    </header>
  )
}
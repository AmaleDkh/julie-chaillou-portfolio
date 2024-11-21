// React element
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

// Style
import "./NavigationMenu.scss";

function NavigationMenu() {
  let location = useLocation();

  return (
    <nav className="navigation-menu">
      <Link
        to="/projects-list"
        className={`navigation-menu__link ${location.pathname === "/projects-list" ? "active" : ""}`}
      >
        MES PROJETS
      </Link>
      <Link
        to="/about"
        className={`navigation-menu__link ${location.pathname === "/about" ? "active" : ""}`}
      >
        À PROPOS
      </Link>
      <Link
        to="/contact"
        className={`navigation-menu__link ${location.pathname === "/contact" ? "active" : ""}`}
      >
        CONTACT
      </Link>
      {/* <span className="navigation-menu__bar"></span>
      <span className="navigation-menu__bar"></span>
      <span className="navigation-menu__bar"></span> */}
    </nav>
  );
}

export default NavigationMenu;

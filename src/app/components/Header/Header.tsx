// React & Next elements
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Components
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import SocialMedia from "../SocialMedia/SocialMedia";

// Style
import "./Header.scss";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`header ${
        location === "/" ? "header__position-absolute" : ""
      } ${isScrolled ? "header--scrolled" : ""}`}
    >
      <div className="header__container">
        <Logo />

        <button
          className="header__menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="header__menu-icon"></span>
        </button>

        <div className={`header__menu ${isOpen ? "header__menu--open" : ""}`}>
          <NavigationMenu />
          <SocialMedia classNameForVersion="header-version" />
          <Button link="/contact" text="UN PROJET ?" />
        </div>
      </div>
    </header>
  );
}

export default Header;

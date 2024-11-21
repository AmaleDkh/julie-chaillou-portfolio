// Components
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import NavigationMenu from "../NavigationMenu/NavigationMenu";
import SocialMedia from "../SocialMedia/SocialMedia";

// Style
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <Logo />
      <div className="header__menu">
        <NavigationMenu />
        <SocialMedia />
        <Button link={"/contact"} text="UN PROJET ?" />
      </div>
    </header>
  );
}

export default Header;

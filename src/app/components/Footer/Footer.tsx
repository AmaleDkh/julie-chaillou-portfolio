// Next element
import { usePathname } from "next/navigation";

// Component
import SocialMedia from "../SocialMedia/SocialMedia";

// Style
import "./Footer.scss";

function Footer() {
  const pathname = usePathname();

  return (
    <footer
      className={`footer ${pathname === "/" && "footer__position-absolute"}`}
    >
      <p className="footer__text">
        © 2024 JULIE VIDÉASTE | TOUS DROITS RÉSERVÉS
      </p>
      <SocialMedia classNameForVersion="footer-version" />
    </footer>
  );
}

export default Footer;

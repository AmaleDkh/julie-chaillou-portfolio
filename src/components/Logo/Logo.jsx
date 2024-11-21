// React element
import { Link } from "react-router-dom";

// Style
import "./Logo.scss";

function Logo() {
  return (
    <Link to="/" className="logo">
      J | C
    </Link>
  );
}

export default Logo;

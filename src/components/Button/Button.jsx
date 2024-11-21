// React element
import { Link } from "react-router-dom";

// Style
import "./Button.scss";

function Button({ link, text }) {
  return (
    <Link to={link} className="button">
      {text}
    </Link>
  );
}

export default Button;

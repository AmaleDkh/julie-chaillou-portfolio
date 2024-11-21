// React element
import { Link } from "react-router-dom";

// Style
import "./ProjectButton.scss";

function ProjectButton({ link, text }) {
  return (
    <Link to={link} className="project-button">
      {text}
    </Link>
  );
}

export default ProjectButton;

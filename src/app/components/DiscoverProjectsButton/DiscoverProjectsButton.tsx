// Component
import Button from "../Button/Button";

// Style
import "./DiscoverProjectsButton.scss";

// Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function DiscoverProjectsButton() {
  return (
    <div className="discover-projects-button">
      <FontAwesomeIcon icon={faAngleDown} />
      <Button link="/videos" text="DÉCOUVRIR MES PROJETS" />
    </div>
  );
}

export default DiscoverProjectsButton;

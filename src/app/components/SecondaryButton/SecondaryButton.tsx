// Next element
import Link from "next/link";

// Style
import "./SecondaryButton.scss";

interface SecondaryButtonProps {
  text: string;
  link: string;
}

function SecondaryButton({ link, text }: SecondaryButtonProps) {
  return (
    <Link className={`secondary-button `} href={link}>
      {text}
    </Link>
  );
}

export default SecondaryButton;

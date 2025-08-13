// React & Next elements
import { useState, useEffect } from "react";
import Link from "next/link";

// Style
import "./SocialMedia.scss";

// // Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

interface SocialMediaProps {
  classNameForVersion?: string;
}

function SocialMedia({ classNameForVersion = "" }: SocialMediaProps) {
  const [, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const [, setIsClient] = useState(false);

  // const [windowWidth, setWindowWidth] = useState<number>(
  //   typeof window !== "undefined" ? window.innerWidth : 1200
  // );

  // const [isClient, setIsClient] = useState(false);

  const socialLinks = [
    {
      href: "",
      icon: faInstagram,
      alt: "Instagram",
      label: "Instagram",
    },
    {
      href: "",
      icon: faTiktok,
      alt: "TikTok",
      label: "TikTok",
    },
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={`social-media ${classNameForVersion}`}>
      {socialLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-media__link"
          aria-label={link.label}
        >
          <FontAwesomeIcon icon={link.icon} />
        </Link>
      ))}
    </div>
  );
}

export default SocialMedia;

// React & Next elements
import { useState, useEffect } from "react";
import Link from "next/link";

// Style
import "./HeroBanner.scss";

// API calls
import { fetchTags, fetchPostsByTagId } from "../../../utils/api";

// Types
interface Tag {
  id: number;
  slug: string;
}

interface Post {
  video_url: {
    guid: string;
  };
}

interface HeroProps {
  videoUrl?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  showScrollIndicator?: boolean;
}

function Hero({
  videoUrl = "",
  title = "JULIE CHAILLOU",
  subtitle = "Créatrice d'histoires visuelles",
  ctaText = "DÉCOUVRIR MES PROJETS",
  ctaLink = "videos/",
  showScrollIndicator = true,
}: HeroProps) {
  const [backgroundVideo, setBackgroundVideo] = useState<string>("");
  const [tagId, setTagId] = useState<number | null>(null);

  useEffect(() => {
    const getTagId = async () => {
      try {
        const tags: Tag[] = await fetchTags();
        const homepageVideoTag = tags.find(
          (tag: Tag) => tag.slug === "homepage-video"
        );

        if (homepageVideoTag) {
          setTagId(homepageVideoTag.id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getTagId();
  }, []);

  useEffect(() => {
    const getBackgroundVideo = async () => {
      try {
        if (tagId) {
          const posts: Post[] = await fetchPostsByTagId(tagId);
          setBackgroundVideo(posts[0].video_url.guid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getBackgroundVideo();
  }, [tagId]);

  return (
    <section className="hero">
      {backgroundVideo && (
        <video
          key={backgroundVideo}
          className="hero__background-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div className="hero__content">
        {title && <h1 className="hero__title">{title}</h1>}
        {subtitle && <p className="hero__subtitle">{subtitle}</p>}
        <Link href={ctaLink} className="hero__cta">
          {ctaText}
        </Link>
      </div>

      {/* {showScrollIndicator && (
        <div className="hero__scroll-indicator">
          <ChevronDown size={24} />
        </div>
      )} */}
    </section>
  );
}

export default Hero;

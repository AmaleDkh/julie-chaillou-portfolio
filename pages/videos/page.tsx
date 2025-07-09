"use client";

// React & Next elements
import React, { useRef, useEffect, useState } from "react";
// import Link from "next/link";

// Components
import Layout from "../../src/app/components/Layout/Layout";
import Button from "../../src/app/components/Button/Button";

// Style
import "../../assets/style/Global.scss";
import "./Videos.scss";

// API calls
import { fetchTags, fetchPostsByTagId } from "../../src/utils/api";

// Types
interface Tag {
  id: number;
  slug: string;
}

interface Article {
  id: number;
  title: {
    rendered: string;
  };
  video_url: {
    guid: string;
  };
}

function VideoPortfolioPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [tagId, setTagId] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement }>({});

  useEffect(() => {
    const getTagId = async () => {
      try {
        const tags = await fetchTags();
        const homepageVideoTag = tags.find(
          (tag: Tag) => tag.slug === "post-with-video"
        );

        if (homepageVideoTag) {
          setTagId(homepageVideoTag.id);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des tags :", error);
      }
    };

    getTagId();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      if (tagId) {
        try {
          const posts = await fetchPostsByTagId(tagId);
          setArticles(posts);
        } catch (error) {
          console.error("Erreur lors de la récupération des articles :", error);
        }
      }
    };

    getPosts();
  }, [tagId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video
              .play()
              .catch((e) => console.log("Erreur de lecture vidéo :", e));
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    Object.values(videoRefs.current).forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [articles]);

  return (
    <Layout>
      <div className="video-portfolio">
        <div className="video-portfolio__list">
          {articles.map((article) => (
            <div key={article.id} className="video-portfolio__item">
              <div className="video-portfolio__video-container">
                <video
                  ref={(el) => {
                    if (el) videoRefs.current[article.id] = el;
                  }}
                  className="video-portfolio__video"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                >
                  <source src={article.video_url.guid} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="video-portfolio__content">
                <h3 className="video-portfolio__title">
                  {article.title.rendered}
                </h3>
                {/* <Link
                  href={`/video-project/${article.id}`}
                  className="video-portfolio__button"
                >
                  Découvrir le projet
                </Link> */}
                <Button
                  text="  Découvrir le projet"
                  link={`/video-project/${article.id}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default VideoPortfolioPage;

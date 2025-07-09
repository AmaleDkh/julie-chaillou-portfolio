"use client";

// React elements
import { useState, useEffect } from "react";

// Component
import ProjectButton from "../ProjectButton/ProjectButton";

// Style
import "./VideoProjectsList.scss";

// API calls
import { fetchTags, fetchPostsByTagId } from "../../../utils/api";

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

function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [tagId, setTagId] = useState<number | null>(null);

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
        console.error(error);
      }
    };

    getTagId();
  }, []);

  useEffect(() => {
    const getPost = async () => {
      try {
        if (tagId) {
          const posts: Article[] = await fetchPostsByTagId(tagId);
          setArticles(posts);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des posts : ", error);
      }
    };

    getPost();
  }, [tagId]);

  console.log("articles", articles);

  return (
    <div className="projects-list">
      {Array.isArray(articles) && articles.length > 0
        ? articles.map((article, index) => (
            <div
              key={article.id}
              className={`projects-list__project ${
                index % 2 === 0
                  ? "projects-list__project--left"
                  : "projects-list__project--right"
              }`}
            >
              <video
                autoPlay
                muted
                loop
                className="projects-list__project__video"
              >
                <source src={article.video_url.guid} type="video/mp4" />
              </video>
              <div className="projects-list__project__information">
                <h3 className="projects-list__project__information__title">
                  {article.title.rendered}
                </h3>
                <ProjectButton
                  link={`/video-project/${article.id}`}
                  text="DÉCOUVRIR LE PROJET"
                />
              </div>
            </div>
          ))
        : ""}
    </div>
  );
}

export default ArticlesList;

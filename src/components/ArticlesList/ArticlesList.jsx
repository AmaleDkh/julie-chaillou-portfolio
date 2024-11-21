// React elements
import { useState, useEffect } from "react";

// Component
import ProjectButton from "../ProjectButton/ProjectButton";

// Style
import "./ArticlesList.scss";

// API calls
import { fetchTags, fetchPostsByTagId } from "../../utils/api";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [tagId, setTagId] = useState(null);

  useEffect(() => {
    const getTagId = async () => {
      try {
        const tags = await fetchTags();
        const homepageVideoTag = tags.find(
          (tag) => tag.slug === "post-with-video"
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
          const posts = await fetchPostsByTagId(tagId);
          setArticles(posts);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des posts : ", error);
      }
    };

    getPost();
  }, [tagId]);

  return (
    <div className="projects-list">
      {Array.isArray(articles) && articles.length > 0
        ? articles.map((article, index) => (
            <div
              key={article.id}
              className={`projects-list__project ${index % 2 === 0 ? "projects-list__project--left" : "projects-list__project--right"}`}
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
                <h2 className="projects-list__project__information__title">
                  {article.title.rendered}
                </h2>
                <ProjectButton
                  link={`/project/${article.id}`}
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

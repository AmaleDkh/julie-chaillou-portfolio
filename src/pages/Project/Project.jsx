// React elements
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Component
import Layout from "../../components/Layout/Layout";

// API call
import { fetchPostById } from "../../utils/api";

// Style
import "./Project.scss";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const getProject = async () => {
      try {
        if (id) {
          const post = await fetchPostById(id);
          setProject(post);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du post : ", error);
      }
    };

    getProject();
  }, [id]);

  return (
    <Layout>
      <div className="project-page">
        {project?.video_url?.guid && (
          <video autoPlay muted loop className="project-page__video">
            <source src={project.video_url.guid} type="video/mp4" />
          </video>
        )}
        <div className="project-page__text">
          <h2 className="project-page__text__title">
            {project?.title.rendered}
          </h2>
          <div className="project-page__text__subtitle">Lorem ipsum</div>
          <div className="project-page__text__paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            dignissim felis eget magna semper accumsan. Maecenas id leo vitae
            ligula tristique venenatis. Mauris cursus tempor ornare. Etiam nec
            convallis tellus, id molestie magna. Nunc eu placerat nunc.
            Suspendisse diam odio, efficitur ac nisl ut, elementum posuere elit.
            Ut vitae dictum enim. Quisque aliquet volutpat nisi, in posuere dui
            dignissim eget. Pellentesque dolor dolor, vestibulum eget semper
            vitae, tincidunt vitae orci.
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Project;

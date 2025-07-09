// Next element
import { GetStaticProps, GetStaticPaths } from "next";

// Component
import Layout from "../../src/app/components/Layout/Layout";

// Style
import "../../assets/style/Global.scss";
import "./VideoProject.scss";

type Project = {
  id: string;
  slug: string;
  title: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  video_url?: {
    guid: string;
  };
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${apiUrl}/posts`);
  const projects: Project[] = await res.json();

  const paths = projects.map((project: Project) => ({
    params: { id: project.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const res = await fetch(`${apiUrl}/posts/${params?.id}`);

    if (!res.ok) {
      return { notFound: true };
    }

    const project: Project = await res.json();

    if (!project) {
      return { notFound: true };
    }

    return { props: { project } };
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return { notFound: true };
  }
};

function Project({ project }: { project: Project }) {
  return (
    <Layout>
      <div className="project-page">
        <div className="project-page__video-container">
          {project?.video_url?.guid ? (
            <video autoPlay muted loop controls className="project-page__video">
              <source src={project.video_url.guid} type="video/mp4" />
              Votre navigateur ne supporte pas la balise vidéo.
            </video>
          ) : (
            <div className="project-page__video-placeholder">
              Vidéo non disponible
            </div>
          )}
        </div>

        <div className="project-page__text">
          <h2
            className="project-page__text__title"
            dangerouslySetInnerHTML={{ __html: project.title.rendered }}
          />
          <div className="project-page__text__paragraph">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  project.content?.rendered || "Aucune description disponible.",
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Project;

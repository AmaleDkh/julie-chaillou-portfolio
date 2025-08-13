// React & Next elements
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Style
import "./NavigationMenu.scss";

// API calls
import { fetchTags, fetchPostsByTagId } from "../../../utils/api";

// Types
interface Tag {
  id: number;
  slug: string;
  name: string;
}

interface Article {
  id: number;
  title: {
    rendered: string;
  };
  video_url?: {
    guid: string;
  };
  slug: string;
}

function NavigationMenu() {
  const location = usePathname();
  const [, setTagId] = useState<number | null>(null);
  // const [tagId, setTagId] = useState<number | null>(null);
  const [videoTitles, setVideosTitles] = useState<Article[]>([]);
  const [photosProjectsTitles, setPhotosProjectsTitles] = useState<Article[]>(
    []
  );
  const [, setPhotosProjectstagId] = useState<number | null>(null);
  // const [photosProjectstagId, setPhotosProjectstagId] = useState<number | null>(
  //   null
  // );
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const handleMouseEnter = (path: string) => {
    if (windowWidth > 992) {
      setActiveDropdown(path);
    }
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    const getTagsAndPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const tags = await fetchTags();

        const homepageVideoTag = tags.find(
          (tag: Tag) => tag.slug === "post-with-video"
        );

        const photosProjectsTag = tags.find(
          (tag: Tag) => tag.slug === "post-with-photos"
        );

        if (homepageVideoTag) {
          setTagId(homepageVideoTag.id);
          const videoPosts: Article[] = await fetchPostsByTagId(
            homepageVideoTag.id
          );
          setVideosTitles(videoPosts.slice(0, 4));
        }

        if (photosProjectsTag) {
          setPhotosProjectstagId(photosProjectsTag.id);
          const photosProjectsList: Article[] = await fetchPostsByTagId(
            photosProjectsTag.id
          );
          setPhotosProjectsTitles(photosProjectsList.slice(0, 4));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des posts : ", error);
        setError("Impossible de charger les projets.");

        setTagId(1);
        setPhotosProjectstagId(2);
        setVideosTitles([
          {
            id: 1,
            title: { rendered: "Projet Vidéo 1" },
            slug: "projet-video-1",
          },
          {
            id: 2,
            title: { rendered: "Projet Vidéo 2" },
            slug: "projet-video-2",
          },
        ]);
        setPhotosProjectsTitles([
          {
            id: 3,
            title: { rendered: "Projet Photo 1" },
            slug: "projet-photo-1",
          },
          {
            id: 4,
            title: { rendered: "Projet Photo 2" },
            slug: "projet-photo-2",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    getTagsAndPosts();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      path: "/videos/page",
      label: "VIDÉOS",
      hasDropdown: true,
      projects: videoTitles,
    },
    {
      path: "/photos/page",
      label: "PHOTOS",
      hasDropdown: true,
      projects: photosProjectsTitles,
    },
    { path: "/about/page", label: "À PROPOS" },
    { path: "/contact/page", label: "CONTACT" },
  ];

  return (
    <nav className="navigation-menu">
      <ul className="navigation-menu__list">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className="navigation-menu__item"
            onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.path)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={item.path}
              className={`navigation-menu__link ${
                location === item.path ? "navigation-menu__link--active" : ""
              }`}
            >
              {item.label}
            </Link>

            {item.hasDropdown && windowWidth > 992 && (
              <div
                className={`navigation-menu__dropdown ${
                  activeDropdown === item.path
                    ? "navigation-menu__dropdown--active"
                    : ""
                }`}
              >
                <div className="navigation-menu__dropdown-content">
                  <h4 className="navigation-menu__dropdown-title">
                    Projets récents
                  </h4>
                  {loading ? (
                    <div className="navigation-menu__loading">
                      <p>Chargement...</p>
                    </div>
                  ) : (
                    <>
                      {error && (
                        <div className="navigation-menu__error">
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#666",
                              fontStyle: "italic",
                            }}
                          >
                            {error}
                          </p>
                        </div>
                      )}
                      <ul className="navigation-menu__dropdown-list">
                        {item.projects && item.projects.length > 0 ? (
                          item.projects.map((project) => (
                            <li
                              key={project.id}
                              className="navigation-menu__dropdown-item"
                            >
                              <Link
                                href={
                                  item.path === "/videos/page"
                                    ? `/video-project/${project.id}`
                                    : `/photo-project/${project.id}`
                                }
                                className="navigation-menu__dropdown-link"
                              >
                                {project.title.rendered}
                              </Link>
                            </li>
                          ))
                        ) : (
                          <li className="navigation-menu__dropdown-item">
                            <span className="navigation-menu__dropdown-link">
                              Aucun projet disponible
                            </span>
                          </li>
                        )}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavigationMenu;

// // React & Next elements
// import { useState } from "react";
// import Link from "next/link";

// // Style
// import "./PhotosList.scss";

// // Custom hook
// import usePhotoProjectsData from "@/hooks/useData";

// type photoProjectType = {
//   id: number;
//   title: {
//     rendered: string;
//   };
//   acf: {
//     project_photo_1: string;
//     project_photo_2: string;
//     project_photo_3: string;
//     project_photo_4: string;
//     project_photo_5: string;
//     project_photo_6: string;
//     project_photo_7: string;
//     project_photo_8: string;
//     project_photo_9: string;
//     project_photo_10: string;
//   };
// };

// function PhotosList() {
//   const [index, setIndex] = useState<number>(1);

//   const photoProjects = usePhotoProjectsData();

//   const photoProjectsNewSet = new Set<{
//     index: number;
//     id: number;
//     title: string;
//     photosUrls: string[];
//   }>();

//   if (Array.isArray(photoProjects)) {
//     photoProjects?.map((photoProject: photoProjectType, index) => {
//       const photoProjectIndex = index;
//       const photoProjectId = photoProject.id;
//       const photoProjectTitle = photoProject.title.rendered;
//       const photoProjectPhotosUrlsObject = photoProject.acf;

//       const photoProjectPhotosUrlsList = Object.values(
//         photoProjectPhotosUrlsObject
//       );

//       photoProjectsNewSet.add({
//         index: photoProjectIndex,
//         id: photoProjectId,
//         title: photoProjectTitle,
//         photosUrls: photoProjectPhotosUrlsList,
//       });
//     });
//   }

//   const newPhotoProjectsList = Array.from(photoProjectsNewSet);

//   const showPreviousProject = () => {
//     setIndex((prevIndex) =>
//       prevIndex === 0 ? newPhotoProjectsList.length - 1 : prevIndex - 1
//     );
//   };

//   const showNextProject = () => {
//     setIndex((nextIndex) =>
//       nextIndex === newPhotoProjectsList.length - 1 ? 0 : nextIndex + 1
//     );
//   };

//   return (
//     <div className="photos-list">
//       <div className="photos-list__photo-container">
//         <img
//           className={`photos-list__photo-container__small-photo left`}
//           src={
//             newPhotoProjectsList[
//               (index - 1 + newPhotoProjectsList.length) %
//                 newPhotoProjectsList.length
//             ]?.photosUrls[0]
//           }
//           onClick={showPreviousProject}
//         />

//         <Link href={`/photo-project/${newPhotoProjectsList[index]?.id}`}>
//           <img
//             className={`photos-list__photo-container__photo center`}
//             src={newPhotoProjectsList[index]?.photosUrls[0]}
//           />
//         </Link>

//         <img
//           className={`photos-list__photo-container__small-photo right`}
//           src={
//             newPhotoProjectsList[(index + 1) % newPhotoProjectsList.length]
//               ?.photosUrls[0]
//           }
//           onClick={showNextProject}
//         />
//       </div>
//     </div>
//   );
// }

// export default PhotosList;

"use client";

import { useState } from "react";
import Link from "next/link";
// import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import usePhotoProjectsData from "@/hooks/useData";
import "./PhotosList.scss";

type PhotoProject = {
  index: number;
  id: number;
  title: string;
  photosUrls: string[];
};

const PhotoPortfolioPage = () => {
  const [selectedProject, setSelectedProject] = useState<PhotoProject | null>(
    null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentMainIndex, setCurrentMainIndex] = useState(0);

  const photoProjectsRaw = usePhotoProjectsData();

  const photoProjects: PhotoProject[] | null = Array.isArray(photoProjectsRaw)
    ? photoProjectsRaw.map((project, index) => {
        const photoProjectPhotosUrlsObject = project.acf?.photos || {};
        const photoProjectPhotosUrlsList = Object.values(
          photoProjectPhotosUrlsObject
        ) as string[];

        return {
          index,
          id: project.id,
          title: project.title.rendered,
          photosUrls: photoProjectPhotosUrlsList,
        };
      })
    : null;

  // 👉 Ajoute cette vérification AVANT le rendu principal
  if (!photoProjects) return <div>Chargement…</div>;

  if (!photoProjects.length) return <div>Chargement...</div>;

  const getPrevIndex = () =>
    currentMainIndex === 0 ? photoProjects.length - 1 : currentMainIndex - 1;

  const getNextIndex = () =>
    currentMainIndex === photoProjects.length - 1 ? 0 : currentMainIndex + 1;

  const goToPrevious = () => setCurrentMainIndex(getPrevIndex());
  const goToNext = () => setCurrentMainIndex(getNextIndex());

  const mainProject = photoProjects[currentMainIndex];
  const leftProject = photoProjects[getPrevIndex()];
  const rightProject = photoProjects[getNextIndex()];

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedProject.photosUrls.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + selectedProject.photosUrls.length) %
          selectedProject.photosUrls.length
      );
    }
  };

  const openProject = (project: PhotoProject) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  return (
    <div className="photo-portfolio margin-section">
      <div className="photo-portfolio__container">
        <div className="photo-portfolio__gallery">
          <div className="photo-portfolio__side-image" onClick={goToPrevious}>
            <img src={leftProject.photosUrls[0]} alt={leftProject.title} />
          </div>

          <div
            className="photo-portfolio__main-image"
            onClick={() => openProject(mainProject)}
          >
            <img src={mainProject.photosUrls[0]} alt={mainProject.title} />
          </div>

          <div className="photo-portfolio__side-image" onClick={goToNext}>
            <img src={rightProject.photosUrls[0]} alt={rightProject.title} />
          </div>
        </div>

        {selectedProject && (
          <div className="photo-portfolio__modal">
            <div className="photo-portfolio__modal-content">
              <Link href="/photos" className="photo-portfolio__modal-back">
                {/* <ArrowLeft size={20} /> */}
                Retour au portfolio
              </Link>
              <button
                className="photo-portfolio__modal-close"
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>
              <h2 className="photo-portfolio__modal-title">
                {selectedProject.title}
              </h2>

              <div className="photo-portfolio__carousel">
                <div className="photo-portfolio__carousel-main">
                  <button
                    className="photo-portfolio__carousel-arrow photo-portfolio__carousel-arrow--left"
                    onClick={prevImage}
                    aria-label="Image précédente"
                  >
                    {/* <ChevronLeft size={24} /> */}
                  </button>

                  <div className="photo-portfolio__carousel-image">
                    <img
                      src={selectedProject.photosUrls[currentImageIndex]}
                      alt={`Photo ${currentImageIndex + 1}`}
                    />
                    <p className="photo-portfolio__carousel-caption">
                      {`Photo ${currentImageIndex + 1} / ${
                        selectedProject.photosUrls.length
                      }`}
                    </p>
                  </div>

                  <button
                    className="photo-portfolio__carousel-arrow photo-portfolio__carousel-arrow--right"
                    onClick={nextImage}
                    aria-label="Image suivante"
                  >
                    {/* <ChevronRight size={24} /> */}
                  </button>
                </div>

                <div className="photo-portfolio__carousel-thumbnails">
                  {selectedProject.photosUrls.map((url, index) => (
                    <button
                      key={index}
                      className={`photo-portfolio__carousel-thumbnail ${
                        index === currentImageIndex
                          ? "photo-portfolio__carousel-thumbnail--active"
                          : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img src={url} alt={`Miniature ${index + 1}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoPortfolioPage;

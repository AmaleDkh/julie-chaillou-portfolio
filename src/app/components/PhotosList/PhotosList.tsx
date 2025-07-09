// React & Next elements
import { useState } from "react";
import Link from "next/link";

// Style
import "./PhotosList.scss";

// Custom hook
import usePhotoProjectsData from "@/hooks/useData";

type photoProjectType = {
  id: number;
  title: {
    rendered: string;
  };
  acf: {
    project_photo_1: string;
    project_photo_2: string;
    project_photo_3: string;
    project_photo_4: string;
    project_photo_5: string;
    project_photo_6: string;
    project_photo_7: string;
    project_photo_8: string;
    project_photo_9: string;
    project_photo_10: string;
  };
};

function PhotosList() {
  const [index, setIndex] = useState<number>(1);

  const photoProjects = usePhotoProjectsData();

  const photoProjectsNewSet = new Set<{
    index: number;
    id: number;
    title: string;
    photosUrls: string[];
  }>();

  if (Array.isArray(photoProjects)) {
    photoProjects?.map((photoProject: photoProjectType, index) => {
      const photoProjectIndex = index;
      const photoProjectId = photoProject.id;
      const photoProjectTitle = photoProject.title.rendered;
      const photoProjectPhotosUrlsObject = photoProject.acf;

      const photoProjectPhotosUrlsList = Object.values(
        photoProjectPhotosUrlsObject
      );

      photoProjectsNewSet.add({
        index: photoProjectIndex,
        id: photoProjectId,
        title: photoProjectTitle,
        photosUrls: photoProjectPhotosUrlsList,
      });
    });
  }

  const newPhotoProjectsList = Array.from(photoProjectsNewSet);

  const showPreviousProject = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? newPhotoProjectsList.length - 1 : prevIndex - 1
    );
  };

  const showNextProject = () => {
    setIndex((nextIndex) =>
      nextIndex === newPhotoProjectsList.length - 1 ? 0 : nextIndex + 1
    );
  };

  return (
    <div className="photos-list">
      <div className="photos-list__photo-container">
        <img
          className={`photos-list__photo-container__small-photo left`}
          src={
            newPhotoProjectsList[
              (index - 1 + newPhotoProjectsList.length) %
                newPhotoProjectsList.length
            ]?.photosUrls[0]
          }
          onClick={showPreviousProject}
        />

        <Link href={`/photo-project/${newPhotoProjectsList[index]?.id}`}>
          <img
            className={`photos-list__photo-container__photo center`}
            src={newPhotoProjectsList[index]?.photosUrls[0]}
          />
        </Link>

        <img
          className={`photos-list__photo-container__small-photo right`}
          src={
            newPhotoProjectsList[(index + 1) % newPhotoProjectsList.length]
              ?.photosUrls[0]
          }
          onClick={showNextProject}
        />
      </div>
    </div>
  );
}

export default PhotosList;

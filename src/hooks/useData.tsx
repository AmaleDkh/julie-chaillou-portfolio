// React elements
import { useEffect, useState } from "react";

// API call
import { fetchPhotoProjects } from "@/utils/api";

type PhotoProjectsContent = {
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

export default function usePhotoProjectsData() {
  const [photoProjects, setPhotoProjects] =
    useState<PhotoProjectsContent | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const photoProjectsList = await fetchPhotoProjects();

        if (photoProjectsList) {
          setPhotoProjects(photoProjectsList);
        }
      } catch (error) {
        console.error(
          "Une erreur est survenue lors de la récupération de la section",
          error
        );
      }
    };
    fetchData();
  }, []);

  return photoProjects;
}

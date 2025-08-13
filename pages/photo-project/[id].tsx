function PhotoProject() {
  return <div>Text</div>;
}

export default PhotoProject;

// // Next elements
// import { GetStaticProps, GetStaticPaths } from "next";
// import { useState } from "react";

// // API URL
// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// // Component
// import Layout from "../../src/app/components/Layout/Layout";

// // Style
// import "../../assets/style/Global.scss";
// import "./PhotoProject.scss";

// // React icons
// import { GoArrowLeft } from "react-icons/go";
// import { GoArrowRight } from "react-icons/go";
// import { IconContext } from "react-icons";

// type photoProjectContent = {
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

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch(`${apiUrl}/photo_projects`);

//   const projects: photoProjectContent[] = await res.json();

//   const paths = projects.map((project: photoProjectContent) => ({
//     params: { id: project.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   try {
//     const res = await fetch(`${apiUrl}/photo_projects/${params?.id}`);

//     if (!res.ok) {
//       return { notFound: true };
//     }

//     const project: photoProjectContent = await res.json();

//     if (!project) {
//       return { notFound: true };
//     }

//     return { props: { project } };
//   } catch (error) {
//     console.error("Erreur lors de la récupération des données :", error);
//     return { notFound: true };
//   }
// };

// function PhotoProject({ project }: { project: photoProjectContent }) {
//   const [index, setIndex] = useState<number>(0);

//   const projectPhotosData = project.acf;

//   const [projectPhotosList, setProjectPhotosList] = useState(
//     Object.entries(projectPhotosData)
//       .filter(([, value]) => value)
//       // .filter(([key, value]) => value)
//       .map(([key, value]) => ({
//         name: key,
//         url: value,
//       }))
//   );

//   const [currentPhoto, setCurrentPhoto] = useState<string>(
//     projectPhotosList[index].url
//   );

//   const showPreviousPhoto = () => {
//     const newIndex = index === 0 ? projectPhotosList.length - 1 : index - 1;
//     console.log("newIndex", newIndex);
//     setIndex(newIndex);
//     setCurrentPhoto(projectPhotosList[newIndex].url);
//     const newList = [
//       projectPhotosList[newIndex],
//       ...projectPhotosList.filter((_, i) => i !== newIndex),
//     ];

//     setProjectPhotosList(newList);
//   };

//   const showNextPhoto = () => {
//     const newIndex = index === projectPhotosList.length - 1 ? 0 : index + 1;

//     const newList = [
//       ...projectPhotosList.slice(newIndex + 1),
//       projectPhotosList[index],
//       ...projectPhotosList.slice(0, newIndex),
//     ];

//     setIndex(newIndex);
//     setCurrentPhoto(newList[newIndex].url);

//     setProjectPhotosList(newList);

//     // console.log("newList", newList);
//   };

//   const showCurrentPhoto = (url: string, index: number) => {
//     setIndex(index);
//     setCurrentPhoto(url);
//   };

//   return (
//     <Layout>
//       <div className="page">
//         <div className="photo-project-page">
//           <h2 className="photo-project-page__title">
//             {project?.title.rendered}
//           </h2>

//           <div className="photo-project-page__photos-container">
//             <img
//               // src={projectPhotosList[index].url}
//               src={currentPhoto}
//               alt=""
//               className="photo-project-page__photos-container__first-photo"
//             />

//             <div className="photo-project-page__photos-container__other-photos-container">
//               <IconContext.Provider value={{ className: "" }}>
//                 <div onClick={showPreviousPhoto} className="icon-left">
//                   <GoArrowLeft />
//                 </div>
//               </IconContext.Provider>

//               <div className="photo-project-page__photos-container__other-photos">
//                 {projectPhotosList.map((photo, index) => (
//                   <div
//                     className="photo-project-page__photos-container__smaller-photo-container"
//                     key={index}
//                     onClick={() => showCurrentPhoto(photo.url, index)}
//                   >
//                     <img src={photo.url} alt="" />
//                   </div>
//                 ))}
//               </div>

//               <IconContext.Provider value={{ className: "" }}>
//                 <div onClick={showNextPhoto} className="icon-right">
//                   <GoArrowRight />
//                 </div>
//               </IconContext.Provider>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default PhotoProject;

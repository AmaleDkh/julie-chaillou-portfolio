// React element
import { createBrowserRouter } from "react-router-dom";

// Components
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import ProjectsList from "./pages/ProjectsList/ProjectsList";
import Project from "./pages/Project/Project";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/projects-list",
    element: <ProjectsList />,
  },
  {
    path: "/project/:id",
    element: <Project />,
  },
]);

export default router;

import { useRoutes } from "react-router-dom";
import MainLayout from "~/layouts/main/MainLayout";
import { ImagePage } from "./elements";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "", element: <ImagePage /> }],
  },
];

export const Router = () => {
  return useRoutes(routes);
};

export default Router;

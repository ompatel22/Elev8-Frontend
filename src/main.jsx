import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegistrationForm from "./components/forms/RegistrationForm.jsx";
import LoginForm from "./components/forms/LoginForm.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/register",
    element: <RegistrationForm/>
  },
  {
    path: "/login",
    element: <LoginForm/>
  },
  {
    path: "/dashboard",
    element: <DashboardPage/>
  },
  {
    path:"/dashboard/profile/:username",
    element: <ProfilePage/>
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);

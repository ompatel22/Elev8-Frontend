import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegistrationForm from "./components/forms/RegistrationForm.jsx";
import LoginForm from "./components/forms/LoginForm.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import HackathonPage from "./pages/HackathonPage.jsx";
import HackathonRegistrationForm from "./components/forms/HackathonRegistrationForm.jsx";
import HackathonDetailsPage from "./pages/HackathonDetailsPage.jsx";
import CollegeChatPage from "./pages/CollegeChatPage.jsx";
import { ChatProvider } from "./context/ChatContext.jsx";
import HackathonRequestPage from "./pages/HackathonRequestPage.jsx";
import HackathonRequestStatusPage from "./pages/HackathonRequestStatusPage.jsx";

const appRouter = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/register", element: <RegistrationForm /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/dashboard/profile/:username", element: <ProfilePage /> },
  { path: "/dashboard/hackathons", element: <HackathonPage /> },
  { path: "/dashboard/hackathons/add", element: <HackathonRegistrationForm /> },
  { path: "/dashboard/hackathons/:id", element: <HackathonDetailsPage /> },
  { path: "/dashboard/hackathons/requests", element: <HackathonRequestPage /> },
  { path: "/dashboard/hackathons/requests/status", element: <HackathonRequestStatusPage /> },
  { path: "/dashboard/college-chat/", element: <CollegeChatPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChatProvider>
      <RouterProvider router={appRouter} />
    </ChatProvider>
  </StrictMode>
);
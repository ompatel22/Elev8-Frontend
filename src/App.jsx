import { useEffect } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { useNavigate } from "react-router-dom";
import { httpClient } from "./config/AxiosHelper";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("username");
    console.log(token);
    if (!token) {
      navigate("/");
    }
    httpClient.defaults.headers.common["username"] = token;
  }, []);

  return (
    <>
      <LandingPage />
    </>
  );
}

export default App;

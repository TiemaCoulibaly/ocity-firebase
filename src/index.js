import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import "./index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "leaflet/dist/leaflet.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//import MemoryApp from "./MemoryApp.jsx";
import { ChampionProvider } from "./RiotChamps.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChampionProvider />
  </StrictMode>
);

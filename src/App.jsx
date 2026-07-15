import { useState, useEffect } from "react";
import Aula from "./Aula";
import GpuGame from "./Game";

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    function onHashChange() {
      setRoute(window.location.hash);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (route.startsWith("#jogo")) {
    return <GpuGame />;
  }
  return <Aula />;
}
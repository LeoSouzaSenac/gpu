import { useState, useEffect } from "react";
import Aula from "./Aula";
import Aula2 from "./Aula2";
import GpuGame from "./Game";
import GpuGame2 from "./Game2";

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    function onHashChange() {
      setRoute(window.location.hash);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (route.startsWith("#jogo2")) {
    return <GpuGame2 />;
  }
  if (route.startsWith("#jogo")) {
    return <GpuGame />;
  }
  if (route.startsWith("#aula2")) {
    return <Aula2 />;
  }
  return <Aula />;
}
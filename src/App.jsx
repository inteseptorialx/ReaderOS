import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Wallpaper from "./components/Wallpaper";
import Toolbar from "./components/Toolbar";
import Window from "./components/Window";

function App() {
  return (
    <>
      <Wallpaper>
        <Toolbar></Toolbar>
      </Wallpaper>
      <Window></Window>
    </>
  );
}

export default App;

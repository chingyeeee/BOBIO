import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Nav } from "./assets/components/Nav";
const Homepage = lazy(() => import("./assets/components/pages/Homepage"));
const Pray = lazy(() => import("./assets/components/pages/Pray"));
const DrawLots = lazy(() => import("./assets/components/pages/DrawLots"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route path="/" index element={<Homepage />} />
            <Route path="/pray" element={<Pray />} />
            <Route path="/drawlots" element={<DrawLots />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

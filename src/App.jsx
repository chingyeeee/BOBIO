import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Nav } from "./assets/components/Nav";
import { DrawLots } from "./assets/components/pages/DrawLots";
import { Homepage } from "./assets/components/pages/Homepage";
import { Pray } from "./assets/components/pages/Pray";

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

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Nav } from "./assets/components/Nav";
import { Homepage } from "./assets/components/pages/Homepage";
import { Pray } from "./assets/components/pages/Pray";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route path="/" index element={<Homepage />} />
            <Route path="/pray" index element={<Pray />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

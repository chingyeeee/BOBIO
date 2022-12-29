import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Nav } from "./assets/components/Nav";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

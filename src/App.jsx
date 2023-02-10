import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Nav } from "./assets/components/Nav";
const Homepage = lazy(() => import("./assets/components/pages/Homepage"));
const Pray = lazy(() => import("./assets/components/pages/Pray"));
const DrawLots = lazy(() => import("./assets/components/pages/DrawLots"));
const DonateMoney = lazy(() => import("./assets/components/pages/DonateMoney"));
const Amulets = lazy(() => import("./assets/components/pages/Amulets"));
const ShoppingCart = lazy(() =>
  import("./assets/components/pages/ShoppingCart")
);
// import Member from "./assets/components/pages/Member";
const Member = lazy(() => import("./assets/components/pages/Member"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route path="/" index element={<Homepage />} />
            <Route path="/pray" element={<Pray />} />
            <Route path="/draw-lots" element={<DrawLots />} />
            <Route path="/donate-money" element={<DonateMoney />} />
            <Route path="/amulets" element={<Amulets />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/member" element={<Member />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

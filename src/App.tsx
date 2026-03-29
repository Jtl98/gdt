import { Route, Routes } from "react-router";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Textures from "./pages/Textures";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="gdt">
          <Route index element={<Home />} />
          <Route path="textures" element={<Textures />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router";
import Home from "./Home";
import Nav from "./Nav";
import Textures from "./Textures";

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

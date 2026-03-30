import { Route, Routes } from "react-router";
import Nav from "./components/nav";
import Home from "./pages/home";
import Textures from "./pages/textures";

export default function App() {
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

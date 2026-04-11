import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router";
import Nav from "./components/nav";
import Home from "./pages/home";
import Textures from "./pages/textures";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Nav />
      <Routes>
        <Route path="gdt">
          <Route index element={<Home />} />
          <Route path="textures" element={<Textures />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

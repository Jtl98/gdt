import { AppBar, Button, Toolbar } from "@mui/material";
import { Link } from "react-router";

export default function Nav() {
  return (
    <AppBar position="static" sx={{ alignItems: "center" }}>
      <Toolbar>
        <Button color="inherit" component={Link} to="/gdt/">
          home
        </Button>
        <Button color="inherit" component={Link} to="/gdt/textures">
          textures
        </Button>
      </Toolbar>
    </AppBar>
  );
}

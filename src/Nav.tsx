import { NavLink } from "react-router";
import "./nav.css";

export default function Nav() {
  return (
    <nav>
      <NavLink to="/gdt" end>
        home
      </NavLink>
      <NavLink to="/gdt/textures">textures</NavLink>
    </nav>
  );
}

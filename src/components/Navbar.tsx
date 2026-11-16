import { NavLink } from "react-router";

const NavBar = () => {
  return (
    <nav className="flex flex-wrap gap-4 p-4">
      <NavLink to="/" end 
      className={({ isActive }) =>
    isActive ? "text-blue-600 font-bold" : "text-stone-600"
  }>
        Inicio
      </NavLink>

      <NavLink to="/catalogo">
        Catálogo
      </NavLink>

      <NavLink to="/cotizador">
        Cotizador
      </NavLink>
    </nav>
  );
};

export default NavBar;
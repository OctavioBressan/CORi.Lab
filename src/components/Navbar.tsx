import { useState } from "react";
import { Link, NavLink } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import logoTejido from "../assets/logo-tejido.png";
import texturaNavbar from "../assets/textura-navbar.png";

const NavBar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

 const estiloEnlace = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "text-base md:text-lg font-bold text-brand-magenta transition-colors md:rounded-full md:border-2 md:border-brand-magenta md:px-3 md:py-1"
    : "text-base md:text-lg font-medium text-ink/90 hover:text-brand-magenta transition-colors md:rounded-full md:border-2 md:border-transparent md:px-3 md:py-1";

  return (    
      <header
        className="sticky top-3 z-50 mx-3 overflow-hidden rounded-2xl bg-canvas bg-cover bg-center shadow-xl md:mx-6 md:bg-[length:450px_auto] md:bg-repeat-x"
        style={{
          backgroundImage: `url(${texturaNavbar})`,
        }}
   >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6"
        aria-label="Navegación principal"
      >
        <div className="flex h-20 items-center justify-between gap-5">
          <Link
            to="/"
            aria-label="CORi.Lab - Inicio"
            onClick={() => setMenuAbierto(false)}
            className="shrink-0"
          >
            <img
              src={logoTejido}
              alt="CORi.Lab"
              className="h-auto w-36 sm:w-44"
            />
          </Link>

          <div className="hidden items-center gap-6 rounded-full bg-canvas/80 px-5 py-2 backdrop-blur-[2px] md:flex">
            <NavLink to="/" end className={estiloEnlace}>
              Inicio
            </NavLink>

            <NavLink to="/catalogo" className={estiloEnlace}>
              Catálogo
            </NavLink>
          </div>

          <NavLink
            to="/cotizador"
            className="hidden rounded-full bg-brand-magenta px-5 py-3 text-base font-semibold text-canvas transition-opacity hover:opacity-80 md:inline-flex"
          >
            Cotizá tu alfombra
          </NavLink>

          <button
            type="button"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
            aria-controls="menu-mobile"
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-0.5 w-6 bg-ink transition-transform duration-300 ${
                menuAbierto ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-ink transition-opacity duration-300 ${
                menuAbierto ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-ink transition-transform duration-300 ${
                menuAbierto ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {menuAbierto && (
            <motion.div
              id="menu-mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-5 py-5">
                <NavLink
                  to="/"
                  end
                  className={estiloEnlace}
                  onClick={() => setMenuAbierto(false)}
                >
                  Inicio
                </NavLink>

                <NavLink
                  to="/catalogo"
                  className={estiloEnlace}
                  onClick={() => setMenuAbierto(false)}
                >
                  Catálogo
                </NavLink>

                <NavLink
                  to="/cotizador"
                  className="self-start rounded-full bg-brand-magenta px-5 py-3 text-sm font-semibold text-canvas"
                  onClick={() => setMenuAbierto(false)}
                >
                  Cotizá tu alfombra
                </NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default NavBar;

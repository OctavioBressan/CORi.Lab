
import { Link } from "react-router";

import texturaTejida from "../assets/textura-navbar.png";
import logoTejido from "../assets/logo-tejido.png";
import { FaInstagram } from "react-icons/fa";

import estrellaAzul from "../assets/brand/03_estrella_azul.svg";
import poligonoCian from "../assets/brand/09_poligono_cian.svg";

const Footer = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-black/10 bg-[#EEF0EF] text-ink">

      {/* Fondo con textura tejida */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url(${texturaTejida})`,
        }}
        aria-hidden="true"
      />

      {/* Decoraciones del manual de marca */}
      <img
        src={estrellaAzul}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[4%] top-[12%] z-0 hidden w-16 opacity-30 lg:block"
      />

      <img
        src={poligonoCian}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[15%] left-[3%] z-0 hidden w-14 opacity-30 lg:block"
      />

      {/* Franja con los cuatro colores oficiales */}
      <div className="relative z-10 flex h-1.5 w-full">
        <div className="flex-1 bg-brand-cyan" />
        <div className="flex-1 bg-brand-magenta" />
        <div className="flex-1 bg-brand-blue" />
        <div className="flex-1 bg-brand-red" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 mx-auto max-w-[1450px] px-6 pb-6 pt-14 md:px-10 lg:pt-20">

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-6">

          {/* Identidad de CORi.Lab */}
          <div className="flex flex-col items-start">

            <Link
              to="/"
              aria-label="CORi.Lab - Ir al inicio"
              className="inline-block"
            >
              <img
                src={logoTejido}
                alt="CORi.Lab"
                className="h-20 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </Link>

            <p className="mt-5 max-w-xs text-xl font-semibold leading-snug">
              Un poco de lana.
              <br />
              Muchas ideas.
            </p>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/70">
              Alfombras hechas a mano, llenas de color,
              creatividad y personalidad.
            </p>

            {/* Instagram oficial de CORi.Lab */}
            <a
              href="https://www.instagram.com/cori.lab.tft/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de CORi.Lab (abre en una pestaña nueva)"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink/80 transition-colors duration-300 hover:text-brand-magenta"
            >
              <FaInstagram size={22} aria-hidden="true" />
              <span>@cori.lab.tft</span>
            </a>


          </div>

          {/* Navegación */}
          <nav
            aria-label="Navegación del pie de página"
            className="flex flex-col items-start md:justify-self-end md:min-w-48"
          >
            <h2 className="mb-6 text-lg font-bold">
              Explorá
            </h2>

            <div className="flex flex-col gap-4">

              <Link
                to="/"
                className="text-sm transition-colors hover:text-brand-magenta"
              >
                Inicio
              </Link>

              <Link
                to="/catalogo"
                className="text-sm transition-colors hover:text-brand-magenta"
              >
                Catálogo
              </Link>

            </div>
          </nav>

        </div>

        {/* Separador inferior */}
        <div className="mt-16 border-t border-black/15 pt-6">

          {/* Copyright y crédito profesional */}
          <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">

            <p className="text-xs text-ink/70">
              © {anioActual} CORi.Lab
            </p>

            <p className="text-xs text-ink/70">
              Desarrollo web ·{" "}
              <a
                href="https://www.linkedin.com/in/octavio-bressan/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline decoration-transparent underline-offset-4 transition-colors hover:text-brand-magenta hover:decoration-current focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-magenta"
              >
                Octavio Bressan
                <span className="sr-only">
                  {" "}(abre en una pestaña nueva)
                </span>
              </a>
            </p>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;


import { motion, useReducedMotion } from "motion/react";

import trazoHero from "../assets/brand/01_trazo_superior_izquierdo.svg";
import trazoSuperior from "../assets/brand/02_trazo_superior_central.svg";
import estrellaAzul from "../assets/brand/03_estrella_azul.svg";
import circuloMagenta from "../assets/brand/04_circulo_magenta.svg";
import trazoIzquierdo from "../assets/brand/05_trazo_inferior_izquierdo.svg";
import trazoHorizontal from "../assets/brand/06_trazo_inferior_horizontal.svg";
import trazoCorto from "../assets/brand/07_trazo_inferior_corto.svg";
import estrellaRoja from "../assets/brand/08_estrella_roja.svg";
import poligonoCian from "../assets/brand/09_poligono_cian.svg";

type Seccion =
  | "hero"
  | "destacadas"
  | "nosotros"
  | "catalogo"
  | "proyectos";

type Decoracion = {
  src: string;
  posicion: string;
  delay: number;
};

const decoraciones: Record<Seccion, Decoracion[]> = {
  // Decoraciones del Hero
  hero: [
    {
      src: estrellaAzul,
      posicion: "top-[20%] left-[8%] w-20",
      delay: 0.1,
    },
    {
      src: circuloMagenta,
      posicion: "top-[19%] right-[5%] w-12",
      delay: 0.3,
    },
    {
      src: trazoHero,
      posicion: "bottom-[7%] left-[3%] w-28",
      delay: 0.5,
    },
  ],

  // Sección de alfombras destacadas
  destacadas: [
    {
      src: trazoSuperior,
      posicion: "top-[10%] left-[3%] w-24",
      delay: 0.1,
    },
    {
      src: estrellaRoja,
      posicion: "bottom-[12%] right-[4%] w-14",
      delay: 0.3,
    },
  ],

  // Sección sobre Cori.lab
  nosotros: [
    {
      src: poligonoCian,
      posicion: "top-[15%] right-[5%] w-16",
      delay: 0.15,
    },
    {
      src: trazoIzquierdo,
      posicion: "bottom-[10%] left-[4%] w-24",
      delay: 0.35,
    },
  ],

  // Vista previa del catálogo
  catalogo: [
    {
      src: trazoHorizontal,
      posicion: "top-[12%] left-[4%] w-20",
      delay: 0.1,
    },
    {
      src: circuloMagenta,
      posicion: "bottom-[15%] right-[5%] w-12",
      delay: 0.25,
    },
  ],

  // Sección de proyectos
  proyectos: [
    {
      src: estrellaAzul,
      posicion: "top-[12%] right-[5%] w-20",
      delay: 0.1,
    },
    {
      src: trazoCorto,
      posicion: "bottom-[12%] left-[5%] w-20",
      delay: 0.3,
    },
  ],
};

const DecoracionesMarca = ({ seccion }: { seccion: Seccion }) => {
  const reducirMovimiento = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      {decoraciones[seccion].map((decoracion) => (
        <motion.img
          key={decoracion.src}
          src={decoracion.src}
          alt=""
          loading="lazy"
          className={`absolute hidden xl:block ${decoracion.posicion}`}
          initial={
            reducirMovimiento
              ? { opacity: 0.4 }
              : {
                  opacity: 0,
                  y: 25,
                  scale: 0.85,
                  rotate: -8,
                }
          }
          whileInView={{
            opacity: 0.4,
            y: 0,
            scale: 1,
            rotate: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: reducirMovimiento ? 0 : 0.7,
            delay: reducirMovimiento ? 0 : decoracion.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default DecoracionesMarca;

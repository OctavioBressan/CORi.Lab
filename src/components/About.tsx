
import { useState } from "react";
import { Link } from "react-router";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import DecoracionesMarca from "./DecoracionesMarca";

import fotoCori from "../assets/about/01-trabajando-en-el-taller.webp";
import fotoTaller from "../assets/about/02-el-taller-y-materiales.webp";
import fotoTufting from "../assets/about/03-tufting-en-accion.webp";
import fotoAfeitadora from "../assets/about/04-terminacion-con-afeitadora.webp";
import fotoTerminada from "../assets/about/05-alfombra-terminada.webp";

const fotos = [
  {
    src: fotoCori,
    titulo: "Manos a la obra",
    alt: "Persona trabajando con una pistola de tufting",
  },
  {
    src: fotoTaller,
    titulo: "El laboratorio",
    alt: "Taller con ovillos de lana y alfombras en proceso",
  },
  {
    src: fotoTufting,
    titulo: "Tufting en acción",
    alt: "Pistola de tufting trabajando sobre tela tensada",
  },
  {
    src: fotoAfeitadora,
    titulo: "Los últimos detalles",
    alt: "Terminación de alfombra con afeitadora eléctrica",
  },
  {
    src: fotoTerminada,
    titulo: "La pieza terminada",
    alt: "Alfombra multicolor terminada sobre una mesa",
  },
];

const About = () => {
  const [fotoActual, setFotoActual] = useState(0);
  const reducirMovimiento = useReducedMotion();

  const cambiarFoto = (paso: number) => {
    setFotoActual(
      (actual) => (actual + paso + fotos.length) % fotos.length,
    );
  };

  // Mostramos la foto principal y las dos siguientes.
  // El resto espera su turno.
  const fotosVisibles = [0, 1, 2].map((posicion) => ({
    ...fotos[(fotoActual + posicion) % fotos.length],
    posicion,
  }));

  return (
    <section
      id="nosotros"
      aria-labelledby="about-titulo"
      className="relative isolate mx-auto w-full max-w-[1450px] px-6 pt-8 pb-20 sm:pt-20 md:px-10 lg:pt-6 lg:pb-28"
    >
      <DecoracionesMarca seccion="nosotros" />

      <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* CARRUSEL DE FOTOS APILADAS */}
        <motion.div
          className="order-2 min-w-0 lg:order-1"
          initial={
            reducirMovimiento
              ? false
              : { opacity: 0, y: 30 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: reducirMovimiento ? 0 : 0.65,
            ease: "easeOut",
          }}
        >
          {/* Contenedor de la pila */}
          <div className="relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/4]">
            <AnimatePresence initial={false}>
              {fotosVisibles.map((foto) => {
                const posicion = foto.posicion;

                return (
                  <motion.div
                    key={foto.src}
                    className={`absolute top-0 right-0 h-full w-[calc(100%-1.5rem)] overflow-hidden rounded-[2rem] bg-surface shadow-xl lg:w-[calc(100%-4.5rem)] ${
                      posicion === 2 ? "hidden lg:block" : ""
                    }`}
                    initial={
                      reducirMovimiento
                        ? false
                        : {
                            x: -80,
                            y: 30,
                            scale: 0.85,
                            opacity: 0,
                          }
                    }
                    animate={{
                      x: posicion * -32,
                      y: posicion * 14,
                      scale: 1 - posicion * 0.045,
                      opacity: 1,
                      zIndex: 30 - posicion * 10,
                    }}
                    exit={{
                      x: 150,
                      y: -20,
                      scale: 1.05,
                      opacity: 0,
                      zIndex: 40,
                    }}
                    transition={{
                      duration: reducirMovimiento ? 0 : 0.45,
                      ease: "easeInOut",
                    }}
                    drag={
                      posicion === 0 && !reducirMovimiento
                        ? "x"
                        : false
                    }
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    dragMomentum={false}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -60) {
                        cambiarFoto(1);
                      } else if (info.offset.x > 60) {
                        cambiarFoto(-1);
                      }
                    }}

                    aria-hidden={posicion !== 0}
                  >
                    <img
                      src={foto.src}
                      alt={foto.alt}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className={`h-full w-full select-none object-cover ${
                        posicion === 0
                          ? "cursor-grab active:cursor-grabbing"
                          : ""
                      }`}
                    />

                    {/* Nombre sobre la foto principal */}
                    {posicion === 0 && (
                      <div className="pointer-events-none absolute bottom-5 left-5 rounded-full bg-ink/75 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                        {foto.titulo}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          {/* Navegación del carrusel */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <span
              className="text-sm font-semibold tracking-wider text-ink"
              aria-live="polite"
            >
              {String(fotoActual + 1).padStart(2, "0")}
              {" / "}
              {String(fotos.length).padStart(2, "0")}

              <span className="ml-2 text-ink/60">
                EL PROCESO
              </span>
            </span>

            {/* Indicadores */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {fotos.map((foto, index) => (
                <span
                  key={foto.src}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    fotoActual === index
                      ? "w-8 bg-brand-magenta"
                      : "w-5 bg-ink/20"
                  }`}
                />
              ))}
            </div>

            {/* Flechas */}
            <div className="flex w-full items-center justify-center gap-2 sm:w-auto">
              <button
                type="button"
                aria-label="Fotografía anterior"
                onClick={() => cambiarFoto(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand-magenta text-xl text-brand-magenta transition-colors hover:bg-brand-magenta hover:text-white"
              >
                ←
              </button>

              <button
                type="button"
                aria-label="Fotografía siguiente"
                onClick={() => cambiarFoto(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-magenta text-xl text-white transition-opacity hover:opacity-80"
              >
                →
              </button>
            </div>
          </div>
        </motion.div>

        {/* TEXTO DEL ABOUT */}
        <motion.div
          className="order-1 flex flex-col items-start gap-6 lg:order-2"
          initial={
            reducirMovimiento
              ? false
              : { opacity: 0, y: 30 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: reducirMovimiento ? 0 : 0.65,
            delay: reducirMovimiento ? 0 : 0.12,
            ease: "easeOut",
          }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-magenta md:text-sm">
            El laboratorio / 01
          </p>

          <h2
            id="about-titulo"
            className="max-w-xl font-body text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl xl:text-6xl"
          >
            Acá las ideas toman forma.
          </h2>

          <p className="max-w-lg text-base leading-relaxed text-ink/85 md:text-lg">
            Entre lanas, colores y pruebas, cada idea va encontrando
            su propia forma. En CORi.Lab nos gusta experimentar
            y transformar esas ideas en alfombras hechas a mano,
            con personalidad propia.
          </p>

          <Link
            to="/catalogo"
            className="rounded-full bg-brand-magenta px-7 py-3 font-semibold text-white shadow-[0_6px_12px_rgba(30,20,10,0.20)] transition-all hover:-translate-y-0.5 hover:shadow-[0_9px_16px_rgba(30,20,10,0.25)]"
          >
            Ver nuestras alfombras ↗
          </Link>

          <p className="hidden rotate-[-3deg] text-lg font-black uppercase tracking-wider text-brand-blue sm:block">
            Craft & chaos ✳
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

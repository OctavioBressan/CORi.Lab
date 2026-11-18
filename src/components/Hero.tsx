import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import sol from "../assets/hero/Sol.webp";
import paisaje from "../assets/hero/Paisaje.webp";
import psicodelica2 from "../assets/hero/Psicodelica2.webp";
import psicodelica from "../assets/hero/Psicodelica.webp";
import perro from "../assets/hero/Perro.webp";
import fondo from "../assets/hero/Fondo.webp";

const sombras = {
  fondo: `
    drop-shadow(0 6px 5px rgba(30, 20, 10, 0.35))
    drop-shadow(0 24px 18px rgba(30, 20, 10, 0.30))
  `,
  intermedia: `
    drop-shadow(0 4px 3px rgba(30, 20, 10, 0.45))
    drop-shadow(0 16px 12px rgba(30, 20, 10, 0.35))
  `,
  superior: `
    drop-shadow(0 5px 4px rgba(30, 20, 10, 0.50))
    drop-shadow(0 19px 13px rgba(30, 20, 10, 0.40))
  `,
  perro: `
    drop-shadow(0 5px 4px rgba(30, 20, 10, 0.55))
    drop-shadow(0 22px 14px rgba(30, 20, 10, 0.45))
  `,
};

const animacionEntrada = (delay: number, reducirMovimiento: boolean) => ({
  initial: reducirMovimiento
    ? false
    : { opacity: 0, y: 18, scale: 0.97 },

  animate: { opacity: 1, y: 0, scale: 1 },

  transition: {
    duration: 0.8,
    ease: "easeOut" as const,
    delay: reducirMovimiento ? 0 : delay,
  },
});

const Hero = () => {
  const reducirMovimiento = useReducedMotion();

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 lg:grid-cols-2 lg:items-center lg:gap-6 lg:px-10 lg:pt-16 lg:pb-24 xl:max-w-[1450px]">
      {/* Contenido principal */}
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <p className="mb-8 text-xs font-semibold tracking-[0.25em] uppercase md:text-sm">
          Diseño · Tufting · Hecho a mano
        </p>

        <h1 className="max-w-xl font-body text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl xl:max-w-2xl xl:text-7xl">
          Un poco de lana.
          <span className="block">Muchas ideas.</span>
        </h1>

        <p className="mt-6 max-w-lg text-base leading-relaxed md:text-lg">
          En CORi.Lab creamos alfombras tufteadas a mano
          y también transformamos tus ideas en piezas únicas,
          hechas a medida.
        </p>

        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            to="/catalogo"
            className="rounded-full bg-ink px-7 py-3 text-center font-semibold text-canvas shadow-[0_6px_12px_rgba(30,20,10,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_9px_16px_rgba(30,20,10,0.30)]"
          >
            Explorar alfombras
          </Link>

          <Link
            to="/cotizador"
            className="rounded-full border-2 border-ink px-7 py-3 text-center font-semibold text-ink shadow-[0_6px_12px_rgba(30,20,10,0.25)] transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-canvas hover:shadow-[0_9px_16px_rgba(30,20,10,0.30)]"
          >
            Cotizar mi idea
          </Link>
        </div>
      </div>

      {/* Composición visual de alfombras */}
      {/* Contenedor principal: controla el tamaño del fondo */}
      <div className="relative mx-auto aspect-square w-[90%] max-w-[600px] xl:w-full xl:max-w-[680px]">
        {/* Fondo: siempre visible, sin animación */}
        <img
          src={fondo}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 w-[111%] max-w-none -translate-x-1/2 -translate-y-1/2"
          style={{ filter: sombras.fondo }}
        />

        {/* Contenedor de las cinco alfombras */}
        <div className="absolute top-1/2 left-1/2 z-10 h-[95%] w-[90%] -translate-x-1/2 -translate-y-1/2">
          {/* Sol: aparece último */}
          <motion.img
            src={sol}
            alt="Alfombra de un sol multicolor"
            className="absolute top-0 left-[30%] z-10 w-[47%] lg:top-[2%] lg:left-[30%]"
            style={{ filter: sombras.intermedia }}
            {...animacionEntrada(0.32, Boolean(reducirMovimiento))}
          />

          {/* Paisaje: aparece tercero */}
          <motion.img
            src={paisaje}
            alt="Alfombra de paisaje al atardecer"
            className="absolute top-[22%] left-[68%] z-20 w-[38%] lg:top-[24%] lg:left-[64%]"
            style={{ filter: sombras.intermedia }}
            {...animacionEntrada(0.16, Boolean(reducirMovimiento))}
          />

          {/* Psicodélica inferior: aparece cuarta */}
          <motion.img
            src={psicodelica}
            alt="Alfombra psicodélica multicolor"
            className="absolute top-[48%] left-[28%] z-20 w-[41%] lg:top-[49%] lg:left-[27%]"
            style={{ filter: sombras.intermedia }}
            {...animacionEntrada(0.24, Boolean(reducirMovimiento))}
          />

          {/* Rosa y celeste: aparece segunda */}
          <motion.img
            src={psicodelica2}
            alt="Alfombra abstracta rosa y celeste"
            className="absolute top-[44%] left-[65%] z-30 w-[34%] lg:top-[46%] lg:left-[60%]"
            style={{ filter: sombras.superior }}
            {...animacionEntrada(0.08, Boolean(reducirMovimiento))}
          />

          {/* Perro: aparece primero */}
          <motion.img
            src={perro}
            alt="Alfombra con forma de perro"
            className="absolute top-[12%] left-[-5%] z-40 w-[43%] lg:top-[18%] lg:left-[0%]"
            style={{ filter: sombras.perro }}
            {...animacionEntrada(0, Boolean(reducirMovimiento))}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

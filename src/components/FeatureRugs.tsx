import { useEffect, useState } from "react";
import { Link } from "react-router";

import texturaTejida from "../assets/textura-navbar.png";
import BotonCompartir from "./BotonCompartir.tsx";
import type { Alfombra } from "../types/Alfombra";
import { obtenerDestacadas } from "../services/alfombrasService.ts";

const fondos = [
  "bg-brand-cyan/30",
  "bg-brand-magenta/30",
  "bg-brand-blue/30",
  "bg-brand-red/30",
];

const FeaturedRugs = () => {
  const [alfombras, setAlfombras] = useState<Alfombra[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;

    obtenerDestacadas()
      .then((datos) => {
        if (activo) {
          setAlfombras(datos);
        }
      })
      .catch(() => {
        if (activo) {
          setError("No se pudieron cargar las alfombras.");
        }
      })
      .finally(() => {
        if (activo) {
          setCargando(false);
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  return (
    <section
      id="destacadas"
      className="mx-auto w-full max-w-[1450px] px-6 py-5 md:px-10 lg:py-24"
    >
      {/* Encabezado */}
      <div className="mb-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-magenta">
          Selección CORi.Lab
        </p>

        <h2 className="font-body text-4xl font-bold tracking-tight sm:text-5xl">
          Alfombras con personalidad.
        </h2>

        <p className="mt-4 max-w-xl text-base text-ink/80">
          Algunos de nuestros trabajos favoritos, hechos a mano
          y con mucho color.
        </p>
      </div>

      {/* Estados de la consulta */}
      {cargando ? (
        <p>Cargando alfombras...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : alfombras.length === 0 ? (
        <p>Todavía no hay alfombras destacadas.</p>
      ) : (
        /* Galería de alfombras destacadas */
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {alfombras.map((alfombra, index) => (
            <article
              key={alfombra.id}
              className="min-w-0"
            >
              {/* Enlace al detalle de la alfombra */}
              <Link
                to={`/catalogo/${alfombra.slug}`}
                className="group block"
              >
                <div className="relative isolate aspect-square overflow-hidden rounded-2xl">
                  {/* Textura de lana */}
                  <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${texturaTejida})`,
                    }}
                  />

                  {/* Color semitransparente */}
                  <div
                    className={`pointer-events-none absolute inset-0 z-0 mix-blend-multiply ${
                      fondos[index % fondos.length]
                    }`}
                  />

                  {/* Imagen de la alfombra */}
                  <img
                    src={alfombra.imagenUrl}
                    alt={alfombra.titulo}
                    loading="lazy"
                    decoding="async"
                    className="relative z-10 h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Información de la alfombra */}
                <h3 className="mt-4 text-xl font-bold">
                  {alfombra.titulo}
                </h3>

                <p className="mt-2 text-sm text-ink/75">
                  {alfombra.descripcion}
                </p>
              </Link>

              {/* Botón de compartir independiente del enlace */}
              <div className="mt-4 flex justify-end">
                <BotonCompartir
                  slug={alfombra.slug}
                  titulo={alfombra.titulo}
                />
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Enlace al catálogo */}
      <div className="mt-12 text-center">
        <Link
          to="/catalogo"
          className="inline-block rounded-full bg-brand-magenta px-7 py-3 font-semibold text-white transition-opacity hover:opacity-80"
        >
          Explorar el catálogo
        </Link>
      </div>
    </section>
  );
};

export default FeaturedRugs;

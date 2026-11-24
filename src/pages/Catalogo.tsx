
import { useEffect, useState } from "react";
import { Link } from "react-router";

import texturaTejida from "../assets/textura-navbar.png";
import type { Alfombra } from "../types/Alfombra.ts";
import { obtenerCatalogo } from "../services/alfombrasService.ts";
import DecoracionesMarca from "../components/DecoracionesMarca.tsx";
import BotonCompartir from "../components/BotonCompartir.tsx";

// Colores oficiales del manual de marca
const fondos = [
  "bg-brand-cyan/30",
  "bg-brand-magenta/30",
  "bg-brand-blue/30",
  "bg-brand-red/30",
];

const Catalogo = () => {
  const [alfombras, setAlfombras] = useState<Alfombra[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let activo = true;

    obtenerCatalogo()
      .then((datos) => {
        if (activo) {
          setAlfombras(datos);
        }
      })
      .catch(() => {
        if (activo) {
          setError(true);
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
    <main className="relative isolate mx-auto max-w-[1450px] px-6 py-16 md:px-10 lg:py-24">
      {/* Encabezado del catálogo */}
      <div className="relative z-10 mb-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-magenta">
          CORi.Lab
        </p>

        <h1 className="text-4xl font-bold sm:text-5xl">
          Nuestro catálogo.
        </h1>

        <p className="mt-4 max-w-xl text-base">
          Explorá nuestras alfombras, diseños y creaciones
          hechas a mano.
        </p>
      </div>

      {/* Estados de la consulta */}
      {cargando ? (
        <p>Cargando catálogo...</p>
      ) : error ? (
        <p role="alert">
          No se pudo cargar el catálogo.
        </p>
      ) : alfombras.length === 0 ? (
        <p>Todavía no hay alfombras publicadas.</p>
      ) : (
        /* Galería con decoraciones dinámicas */
        <div className="relative isolate 2xl:px-24">
          <DecoracionesMarca
            seccion="catalogo"
            cantidadAlfombras={alfombras.length}
          />

          <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                    {/* Textura tejida original */}
                    <div
                      className="absolute inset-0 z-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${texturaTejida})`,
                      }}
                    />

                    {/* Color semitransparente sobre la textura */}
                    <div
                      className={`pointer-events-none absolute inset-0 z-0 mix-blend-multiply ${
                        fondos[index % fondos.length]
                      }`}
                    />

                    {/* Fotografía original */}
                    <img
                      src={alfombra.imagenUrl}
                      alt={alfombra.titulo}
                      loading="lazy"
                      decoding="async"
                      className="relative z-10 h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Información de la alfombra */}
                  <h2 className="mt-4 text-xl font-bold">
                    {alfombra.titulo}
                  </h2>

                  <p className="mt-2 text-sm">
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
        </div>
      )}
    </main>
  );
};

export default Catalogo;

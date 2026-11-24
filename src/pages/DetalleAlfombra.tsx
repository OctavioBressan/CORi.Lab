
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import type { Alfombra } from "../types/Alfombra.ts";
import { obtenerAlfombraPorSlug } from "../services/alfombrasService.ts";

import texturaTejida from "../assets/textura-navbar.png";
import LupaAlfombra from "../components/LupaAlfombra.tsx";
import BotonCompartir from "../components/BotonCompartir.tsx";

// Colores oficiales del manual de marca
const fondos = [
  "bg-brand-cyan/30",
  "bg-brand-magenta/30",
  "bg-brand-blue/30",
  "bg-brand-red/30",
];

const DetalleAlfombra = () => {
  const { slug } = useParams();

  const [alfombra, setAlfombra] = useState<Alfombra | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    if (!slug) {
      setCargando(false);
      return;
    }

    setCargando(true);
    setAlfombra(null);

    obtenerAlfombraPorSlug(slug)
      .then((datos) => {
        if (activo) {
          setAlfombra(datos ?? null);
        }
      })
      .catch(() => {
        if (activo) {
          setAlfombra(null);
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
  }, [slug]);

  // Estado de carga
  if (cargando) {
    return <p className="p-8">Cargando alfombra...</p>;
  }

  // Alfombra inexistente
  if (!alfombra) {
    return <p className="p-8">No encontramos esta alfombra.</p>;
  }

  // Estado comercial
  const estado = alfombra.disponible
    ? "Disponible"
    : alfombra.reproducible
      ? "Disponible por encargo"
      : "No disponible actualmente";

  // Fondo según el orden de la alfombra
  const fondo = fondos[(alfombra.orden - 1) % fondos.length];

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 md:px-10">

      {/* Volver al catálogo */}
      <Link
        to="/catalogo"
        className="text-sm text-brand-magenta"
      >
        ← Volver al catálogo
      </Link>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">

        {/* Fotografía con fondo tejido */}
        <div className="relative isolate flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl p-6 md:min-h-[450px] md:p-10">

          {/* Textura de lana */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${texturaTejida})`,
            }}
          />

          {/* Color semitransparente */}
          <div
            className={`pointer-events-none absolute inset-0 z-0 mix-blend-multiply ${fondo}`}
          />

          {/* Imagen con lupa interactiva */}
          <LupaAlfombra
            src={alfombra.imagenUrl}
            alt={alfombra.titulo}
          />
        </div>

        {/* Información de la alfombra */}
        <div>
          <h1 className="text-4xl font-bold">
            {alfombra.titulo}
          </h1>

          <p className="mt-6 text-lg">
            {alfombra.descripcion}
          </p>

          {/* Precio */}
          <p className="mt-8 text-2xl font-bold">
            {alfombra.precio !== null
              ? new Intl.NumberFormat("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  maximumFractionDigits: 0,
                }).format(alfombra.precio)
              : "Consultar precio"}
          </p>

          {/* Disponibilidad */}
          <p className="mt-4 font-medium">
            {estado}
          </p>

          {/* Compartir esta alfombra */}
          <div className="mt-8">
            <BotonCompartir
              slug={alfombra.slug}
              titulo={alfombra.titulo}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetalleAlfombra;

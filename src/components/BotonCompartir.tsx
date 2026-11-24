
import { useEffect, useRef, useState } from "react";

import {
  FaWhatsapp,
  FaTelegramPlane,
  FaEnvelope,
  FaCopy,
  FaShareAlt,
} from "react-icons/fa";

// Mensaje personalizable para compartir alfombras
const MENSAJE_COMPARTIR =
  "¡Ey! Mirá esta hermosa alfombra que encontré en CORi.Lab 😍";

type Props = {
  slug: string;
  titulo: string;
};

const BotonCompartir = ({ slug, titulo }: Props) => {
  const [abierto, setAbierto] = useState(false);
  const [aviso, setAviso] = useState("");

  const contenedorRef = useRef<HTMLDivElement>(null);

  // URL del detalle de la alfombra
  const url = new URL(
    `/catalogo/${encodeURIComponent(slug)}`,
    window.location.origin
  ).href;

  const mensajeCompleto = `${MENSAJE_COMPARTIR}\n${url}`;

  const whatsappUrl =
    `https://wa.me/?text=${encodeURIComponent(mensajeCompleto)}`;

  const telegramUrl =
    `https://t.me/share/url?url=${encodeURIComponent(url)}` +
    `&text=${encodeURIComponent(MENSAJE_COMPARTIR)}`;

  const correoUrl =
    `mailto:?subject=${encodeURIComponent(titulo)}` +
    `&body=${encodeURIComponent(mensajeCompleto)}`;

  // Cerrar el menú al hacer clic fuera o presionar Escape
  useEffect(() => {
    if (!abierto) return;

    const cerrarAfuera = (evento: PointerEvent) => {
      if (
        contenedorRef.current &&
        !contenedorRef.current.contains(evento.target as Node)
      ) {
        setAbierto(false);
      }
    };

    const cerrarEscape = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") {
        setAbierto(false);
      }
    };

    document.addEventListener("pointerdown", cerrarAfuera);
    document.addEventListener("keydown", cerrarEscape);

    return () => {
      document.removeEventListener("pointerdown", cerrarAfuera);
      document.removeEventListener("keydown", cerrarEscape);
    };
  }, [abierto]);

  // Abrir el menú nativo del dispositivo
  const compartirNativo = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title: titulo,
        text: MENSAJE_COMPARTIR,
        url,
      });

      setAbierto(false);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      setAviso("No se pudo abrir el menú para compartir.");
    }
  };

  // Copiar únicamente el enlace
  const copiarEnlace = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setAviso("¡Enlace copiado!");
    } catch {
      setAviso("No se pudo copiar el enlace.");
    }
  };

  const estiloOpcion =
    "flex w-full items-center gap-3 rounded-lg px-4 py-3 " +
    "text-left text-sm transition-colors hover:bg-brand-magenta/10";

  return (
    <div
      ref={contenedorRef}
      className="relative inline-block"
    >
      {/* Botón principal */}
      <button
        type="button"
        aria-expanded={abierto}
        aria-label={`Compartir ${titulo}`}
        onClick={() => {
          setAbierto(!abierto);
          setAviso("");
        }}
        className="inline-flex items-center gap-2 rounded-full border border-brand-magenta px-4 py-2 text-sm font-semibold text-brand-magenta transition-colors hover:bg-brand-magenta hover:text-white"
      >
        <FaShareAlt size={16} aria-hidden="true" />
        Compartir
      </button>

      {/* Menú de opciones */}
      {abierto && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-black/10 bg-white p-2 text-ink shadow-xl">

          {/* Compartir con aplicaciones del dispositivo */}
          {typeof navigator.share === "function" && (
            <button
              type="button"
              onClick={compartirNativo}
              className={`${estiloOpcion} font-semibold`}
            >
              <FaShareAlt
                size={18}
                className="text-brand-magenta"
                aria-hidden="true"
              />
              Compartir con aplicaciones
            </button>
          )}

          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setAbierto(false)}
            className={estiloOpcion}
          >
            <FaWhatsapp
              size={22}
              className="text-[#25D366]"
              aria-hidden="true"
            />
            WhatsApp
          </a>

          {/* Telegram */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setAbierto(false)}
            className={estiloOpcion}
          >
            <FaTelegramPlane
              size={22}
              className="text-[#229ED9]"
              aria-hidden="true"
            />
            Telegram
          </a>

          {/* Correo electrónico */}
          <a
            href={correoUrl}
            onClick={() => setAbierto(false)}
            className={estiloOpcion}
          >
            <FaEnvelope
              size={19}
              className="text-gray-600"
              aria-hidden="true"
            />
            Correo electrónico
          </a>

          <div className="my-2 border-t border-black/10" />

          {/* Copiar enlace */}
          <button
            type="button"
            onClick={copiarEnlace}
            className={`${estiloOpcion} font-semibold text-brand-magenta`}
          >
            <FaCopy size={19} aria-hidden="true" />
            Copiar enlace
          </button>

          {/* Confirmación de copia o error */}
          {aviso && (
            <p
              role="status"
              className="px-4 py-2 text-xs text-gray-600"
            >
              {aviso}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BotonCompartir;

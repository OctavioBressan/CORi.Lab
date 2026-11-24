
import { useEffect, useState } from "react";
import type { PointerEvent } from "react";
import { createPortal } from "react-dom";

type Props = {
  src: string;
  alt: string;
};

type EstadoLupa = {
  left: number;
  top: number;
  backgroundSize: string;
  backgroundPosition: string;
};

const TAMANIO_LUPA = 190;
const ZOOM = 2.5;
const SEPARACION = 30;

const LupaAlfombra = ({ src, alt }: Props) => {
  const [lupa, setLupa] = useState<EstadoLupa | null>(null);

  useEffect(() => {
    const ocultarLupa = () => setLupa(null);

    window.addEventListener("scroll", ocultarLupa, true);
    window.addEventListener("resize", ocultarLupa);

    return () => {
      window.removeEventListener("scroll", ocultarLupa, true);
      window.removeEventListener("resize", ocultarLupa);
    };
  }, []);

  const moverLupa = (evento: PointerEvent<HTMLImageElement>) => {
    // La lupa funciona solamente con mouse y en escritorio
    if (evento.pointerType !== "mouse" || window.innerWidth < 768) {
      setLupa(null);
      return;
    }

    const imagen = evento.currentTarget;
    const rect = imagen.getBoundingClientRect();

    if (!imagen.naturalWidth || !imagen.naturalHeight) {
      return;
    }

    // Calculamos el tamaño visible real de la fotografía
    const escala = Math.min(
      rect.width / imagen.naturalWidth,
      rect.height / imagen.naturalHeight
    );

    const anchoVisible = imagen.naturalWidth * escala;
    const altoVisible = imagen.naturalHeight * escala;

    const inicioX = rect.left + (rect.width - anchoVisible) / 2;
    const inicioY = rect.top + (rect.height - altoVisible) / 2;

    const x = evento.clientX - inicioX;
    const y = evento.clientY - inicioY;

    // No mostramos la lupa fuera de la fotografía
    if (
      x < 0 ||
      y < 0 ||
      x > anchoVisible ||
      y > altoVisible
    ) {
      setLupa(null);
      return;
    }

    // Preferimos mostrar la lupa a la derecha del cursor
    const espacioDerecha =
      evento.clientX + SEPARACION + TAMANIO_LUPA + 12 <=
      window.innerWidth;

    const left = espacioDerecha
      ? evento.clientX + SEPARACION
      : evento.clientX - TAMANIO_LUPA - SEPARACION;

    // Si no entra a ninguno de los lados, la ocultamos
    if (left < 12) {
      setLupa(null);
      return;
    }

    // Evitamos que la lupa salga de la pantalla
    const top = Math.max(
      12,
      Math.min(
        evento.clientY - TAMANIO_LUPA / 2,
        window.innerHeight - TAMANIO_LUPA - 12
      )
    );

    // Calculamos qué parte de la imagen debe ampliarse
    setLupa({
      left,
      top,
      backgroundSize: `${anchoVisible * ZOOM}px ${altoVisible * ZOOM}px`,
      backgroundPosition: `${
        TAMANIO_LUPA / 2 - x * ZOOM
      }px ${TAMANIO_LUPA / 2 - y * ZOOM}px`,
    });
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        className="relative z-10 max-h-[600px] w-full rounded-xl object-contain cursor-zoom-in"
        onPointerMove={moverLupa}
        onPointerLeave={() => setLupa(null)}
        onPointerCancel={() => setLupa(null)}
      />

      {lupa &&
        createPortal(
          <div
            aria-hidden="true"
            className="pointer-events-none fixed z-[9999] h-[190px] w-[190px] rounded-full bg-white bg-no-repeat ring-4 ring-white shadow-2xl"
            style={{
              left: lupa.left,
              top: lupa.top,
              backgroundImage: `url("${src}")`,
              backgroundSize: lupa.backgroundSize,
              backgroundPosition: lupa.backgroundPosition,
            }}
          />,
          document.body
        )}
    </>
  );
};

export default LupaAlfombra;

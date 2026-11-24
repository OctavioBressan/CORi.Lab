
import type { Alfombra } from "../types/Alfombra.ts";

import alfombra1 from "../assets/alfombras/01-collage-de-prendas.webp";
import alfombra2 from "../assets/alfombras/02-refugio-nevado.webp";
import alfombra3 from "../assets/alfombras/03-perrito-gris.webp";
import alfombra4 from "../assets/alfombras/04-curvas-de-color.webp";
import alfombra5 from "../assets/alfombras/05-rosa-y-turquesa.webp";
import alfombra6 from "../assets/alfombras/06-ondas-psicodelicas.webp";
import alfombra7 from "../assets/alfombras/07-rosas-rojas.webp";
import alfombra8 from "../assets/alfombras/08-sol-multicolor.webp";

// Datos de prueba: los nombres son provisorios y los estados comerciales
// NO representan stock real. Cori podrá administrarlos desde el panel.

export const alfombrasMock: Alfombra[] = [
  {
    id: "1",
    slug: "collage-de-prendas",
    titulo: "Collage de prendas",
    descripcion:
      "Composición textil que reúne siluetas de prendas y accesorios en tonos verdes, marrones y rojos.",
    imagenUrl: alfombra1,
    precio: null,
    disponible: false,
    reproducible: false,
    destacada: true,
    publicada: true,
    orden: 1,
  },
  {
    id: "2",
    slug: "refugio-nevado",
    titulo: "Refugio nevado",
    descripcion:
      "Paisaje de montaña con nieve, cabaña iluminada y lago azul, presentado en un marco de madera.",
    imagenUrl: alfombra2,
    precio: null,
    disponible: false,
    reproducible: false,
    destacada: true,
    publicada: true,
    orden: 2,
  },
  {
    id: "3",
    slug: "perrito-gris",
    titulo: "Perrito gris",
    descripcion:
      "Retrato textil de un perro gris y blanco, realizado sobre un bastidor de tufting.",
    imagenUrl: alfombra3,
    precio: null,
    disponible: false,
    reproducible: false,
    destacada: true,
    publicada: true,
    orden: 3,
  },
  {
    id: "4",
    slug: "curvas-de-color",
    titulo: "Curvas de color",
    descripcion:
      "Diseño geométrico de curvas y franjas multicolores.",
    imagenUrl: alfombra4,
    precio: null,
    disponible: false,
    reproducible: false,
    destacada: true,
    publicada: true,
    orden: 4,
  },
  {
    id: "5",
    slug: "rosa-y-turquesa",
    titulo: "Rosa y turquesa",
    descripcion:
      "Diseño abstracto con formas orgánicas en rosa intenso y turquesa.",
    imagenUrl: alfombra5,
    precio: null,
    disponible: false,
    reproducible: false,
    destacada: true,
    publicada: true,
    orden: 5,
  },
  {
    id: "6",
    slug: "ondas-psicodelicas",
    titulo: "Ondas psicodélicas",
    descripcion:
      "Alfombra de ondas y figuras fluidas en rojo, naranja, amarillo, verde y celeste.",
    imagenUrl: alfombra6,
    precio: null,
    disponible: false,
    reproducible: false,
    destacada: true,
    publicada: true,
    orden: 6,
  },
  {
    id: "7",
    slug: "rosas-rojas",
    titulo: "Rosas rojas",
    descripcion:
      "Alfombra de base blanca con tres rosas rojas y hojas verdes.",
    imagenUrl: alfombra7,
    precio: null,
    disponible: false,
    reproducible: false,
    destacada: true,
    publicada: true,
    orden: 7,
  },
  {
    id: "8",
    slug: "sol-multicolor",
    titulo: "Sol multicolor",
    descripcion:
      "Diseño textil de un sol naranja y un horizonte de franjas multicolores.",
    imagenUrl: alfombra8,
    precio: null,
    disponible: false,
    reproducible: false,
    destacada: true,
    publicada: true,
    orden: 8,
  },
];

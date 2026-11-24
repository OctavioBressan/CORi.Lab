import { alfombrasMock } from "../mocks/alfombras.ts";
import type { Alfombra } from "../types/Alfombra.ts";

export async function obtenerDestacadas(): Promise<Alfombra[]> {
  return alfombrasMock
    .filter((alfombra) => alfombra.destacada && alfombra.publicada)
    .sort((a, b) => a.orden - b.orden);
}

export async function obtenerAlfombraPorSlug(
  slug: string
): Promise<Alfombra | undefined> {
  return alfombrasMock.find(
    (alfombra) =>
      alfombra.slug === slug && alfombra.publicada
  );
}


export async function obtenerCatalogo(): Promise<Alfombra[]> {
  return alfombrasMock
    .filter((alfombra) => alfombra.publicada)
    .sort((a, b) => a.orden - b.orden);
}

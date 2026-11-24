export interface Alfombra {
  id: string;
  slug: string;
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  precio: number | null;
  disponible: boolean;
  reproducible: boolean;
  destacada: boolean;
  publicada: boolean;
  orden: number;
}

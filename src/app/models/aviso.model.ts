export interface Aviso {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  foto?: string; // El signo ? significa que es opcional
}
export class Recetas {
  id: number;
  codigo: number;
  nombre: string;
  telefono1: string;
  direccion: string;
}

export class Recetasdetalle {
  id: number;
  codigo: number;
  codpro: string;
  descripcion: string;
  tipo: string;
  estado: number;
  codemp: string;
  nombre: string;
  cc: string;
  descc: string;
  fechaini: Date;
  fechafin: Date;
  turno: string;
  importe: string;
}

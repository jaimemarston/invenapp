export interface IRecetas {
  id?: number;
  codigo: number;
  nombre: string;
  telefono1: string;
  direccion: string;
  totcant: string;
  movrecetas?: Array<IRecetasdetalle> | null;
}

export interface IRecetasdetalle {
  id?: number;
  codigo: number;
  codemp: string;
  nombre: string;
  cc: string;
  descc: string;
  fechaini: Date;
  fechafin: Date;
  turno: string;
  cantidad: string;
  importe: string;
  master: number | null;
}



//https://www.desarrolloweb.com/articulos/clases-interfaces-servicios-angular.html
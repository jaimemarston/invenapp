export interface IProduccion {
  id?: number;
  codigo: number;
  nombre: string;
  telefono1: string;
  direccion: string;
  totcant: string;
  movproduccion?: Array<IProducciondetalle> | null;
}

export interface IProducciondetalle {
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
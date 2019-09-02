export interface ITareo {
  id?: number;
  codigo: number;
  nombre: string;
  nsemana: string;
  fechaini: string;
  fechafin: string;
  movreloj?: Array<ITareodetalle> | null;
}

export interface ITareodetalle {
  id?: number;
  codigo: string;
  codemp: string;
  nombre: string;
  fechaini: Date;
  fechafin: Date;
  hrentrada: string;
  hrinidesc: string;
  hrfindesc: string;
  hrsalida: string;
  hrtotal: string;
  master: number | null;
}



//https://www.desarrolloweb.com/articulos/clases-interfaces-servicios-angular.html
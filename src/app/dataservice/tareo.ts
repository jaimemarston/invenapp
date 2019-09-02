export interface Tareo {
  id: number;
  codigo: number;
  nombre: string;
  nsemana: string;
  fechaini: string;
  fechafin: string;
}

export interface Tareodetalle {
  id: number;
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

}
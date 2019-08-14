export interface IEmpleados {
  id?: number;
  codigo: number;
  nombre: string;
  telefono1: string;
  direccion: string;
  movpersonal?: Array<IEmpleadosdetalle> | null;
}

export interface IEmpleadosdetalle {
  id?: number;
  codigo: number;
  codemp: string;
  nombre: string;
  cc: string;
  descc: string;
  fechaini: Date;
  fechafin: Date;
  turno: string;
  importe: string;
  master: number | null;
}




//https://www.desarrolloweb.com/articulos/clases-interfaces-servicios-angular.html
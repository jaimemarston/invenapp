export class Empleados {
  id: number;
  codigo: number;
  nombre: string;
  telefono1: string;
  direccion: string;
}

export class Empleadosdetalle {
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


export class Empctactedetalle {
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
  codctacte: string;
  desctacte: string;
  fechaini: Date;
  fechafin: Date;
  turno: string;
  importe: string;
}

import { BASEURL } from '../../../environments/environment';

export class TareoEndpoint {
  // public static getUser = BASEURL + 'cliente' + 1 + 'id';
  public static rest = `${BASEURL}mtareo`;
}

export class TareodetalleEndpoint {
  // public static getUser = BASEURL + 'cliente' + 1 + 'id';
  public static rest = `${BASEURL}datosreloj`;
}

export class Empleadodetalle2Endpoint {
  // public static getUser = BASEURL + 'cliente' + 1 + 'id';
  public static rest = `${BASEURL}empleadorem`;
}


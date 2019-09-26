import { BASEURL } from '../../../environments/environment';

export class RecetasEndpoint {
  // public static getUser = BASEURL + 'cliente' + 1 + 'id';
  public static rest = `${BASEURL}mrecetas`;
}

export class RecetasdetalleEndpoint {
  // public static getUser = BASEURL + 'cliente' + 1 + 'id';
  public static rest = `${BASEURL}prodetrecetas`;
}



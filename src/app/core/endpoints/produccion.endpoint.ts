import { BASEURL } from '../../../environments/environment';

export class ProduccionEndpoint {
  // public static getUser = BASEURL + 'cliente' + 1 + 'id';
  public static rest = `${BASEURL}mproduccion`;
}

export class ProducciondetalleEndpoint {
  // public static getUser = BASEURL + 'cliente' + 1 + 'id';
  public static rest = `${BASEURL}prodetproduccion`;
}



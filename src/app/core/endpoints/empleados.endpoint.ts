import { BASEURL } from '../../../environments/environment';

export class EmpleadosEndpoint {
  // public static getUser = BASEURL + 'cliente' + 1 + 'id';
  public static rest = `${BASEURL}mempleados`;
}

export class EmpleadodetalleEndpoint {
  // public static getUser = BASEURL + 'cliente' + 1 + 'id';
  public static rest = `${BASEURL}plmovpersonal`;
}


export class EmpctactedetalleEndpoint {
  // public static getUser = BASEURL + 'cliente' + 1 + 'id';
  public static rest = `${BASEURL}plctacte`;
}

export class Empleadodetalle2Endpoint {
  // public static getUser = BASEURL + 'cliente' + 1 + 'id';
  public static rest = `${BASEURL}empleadorem`;
}


import {BASEURL} from '../../../environments/environment';

export class MovmaterialEndpoint {
    // public static getUser = BASEURL + 'cliente' + 1 + 'id';
    public static rest = `${BASEURL}mmateriales`;
    public static estados = `${BASEURL}cotizacion_estado`;
}

export class MovmaterialdetalleEndpoint {
    // public static getUser = BASEURL + 'cliente' + 1 + 'id';
    public static rest = `${BASEURL}dmateriales`;
}

export class ClientesdirecciondetailEndpoint {
    // public static getUser = BASEURL + 'cliente' + 1 + 'id';
    public static rest = `${BASEURL}clientesdirecciondetail`;
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProduccionEndpoint } from '../endpoints/produccion.endpoint';
import { Observable } from 'rxjs';
import { Produccion } from '../../dataservice/produccion';
import { IProduccion } from '../interfaces/produccion.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<IProduccion>> {
    return this.http.get<Array<IProduccion>>(ProduccionEndpoint.rest);
  }

  getOne(id: number): Observable<IProduccion> {
    const url = `${ProduccionEndpoint.rest}/${id}/`;
    return this.http.get<IProduccion>(url);
  }


  addProduccion(data: IProduccion): Observable<IProduccion> {
    const url = `${ProduccionEndpoint.rest}/`;
    return this.http.post<IProduccion>(url, data);
  }

  updateProduccion(id: number, data: IProduccion): Observable<IProduccion> {
    const url = `${ProduccionEndpoint.rest}/${id}/`;
    return this.http.put<IProduccion>(url, data);
  }

  deleteProduccion(id: number): Observable<any | null> {
    const url = `${ProduccionEndpoint.rest}/${id}/`;
    return this.http.delete(url);
  }


}

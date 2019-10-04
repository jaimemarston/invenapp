import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProducciondetalleEndpoint } from '../endpoints/produccion.endpoint';
import { Observable } from 'rxjs';
import { Producciondetalle } from '../../dataservice/produccion';
import { IProducciondetalle } from '../interfaces/produccion.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProducciondetalleService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<IProducciondetalle>> {
    return this.http.get<Array<IProducciondetalle>>(ProducciondetalleEndpoint.rest)
  }


  getOne(id: number): Observable<IProducciondetalle> {
    const url = `${ProducciondetalleEndpoint.rest}/${id}`;
    return this.http.get<IProducciondetalle>(url);
  }

  addProduccion(data: IProducciondetalle): Observable<IProducciondetalle> {
    return this.http.post<IProducciondetalle>(ProducciondetalleEndpoint.rest, data);
  }

  updateProduccion(id: number, data: IProducciondetalle): Observable<IProducciondetalle> {
    const url = `${ProducciondetalleEndpoint.rest}/${id}`;
    return this.http.put<IProducciondetalle>(url, data);
  }

  deleteProduccion(id: number): Observable<any | null> {
    const url = `${ProducciondetalleEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }
}

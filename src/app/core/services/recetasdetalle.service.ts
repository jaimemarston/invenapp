import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecetasdetalleEndpoint } from '../endpoints/recetas.endpoint';
import { Observable } from 'rxjs';
import { Recetasdetalle } from '../../dataservice/recetas';
import { IRecetasdetalle } from '../interfaces/recetas.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecetasdetalleService {
  constructor(private http: HttpClient) {
  }

  getRecetas(): Observable<Array<IRecetasdetalle>> {
    return this.http.get<Array<IRecetasdetalle>>(RecetasdetalleEndpoint.rest)
  }


  getReceta(id: number): Observable<IRecetasdetalle> {
    const url = `${RecetasdetalleEndpoint.rest}/${id}`;
    return this.http.get<IRecetasdetalle>(url);
  }

  addRecetas(data: IRecetasdetalle): Observable<IRecetasdetalle> {
    return this.http.post<IRecetasdetalle>(RecetasdetalleEndpoint.rest, data);
  }

  updateRecetas(id: number, data: IRecetasdetalle): Observable<IRecetasdetalle> {
    const url = `${RecetasdetalleEndpoint.rest}/${id}`;
    return this.http.put<IRecetasdetalle>(url, data);
  }

  deleteRecetas(id: number): Observable<any | null> {
    const url = `${RecetasdetalleEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }
}

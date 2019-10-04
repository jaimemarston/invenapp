import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecetasEndpoint } from '../endpoints/recetas.endpoint';
import { Observable } from 'rxjs';
import { Recetas } from '../../dataservice/recetas';
import { IRecetas } from '../interfaces/recetas.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  constructor(private http: HttpClient) {
  }

  getRecetas(): Observable<Array<IRecetas>> {
    return this.http.get<Array<IRecetas>>(RecetasEndpoint.rest)
  }

  getReceta(id: number): Observable<IRecetas> {
    const url = `${RecetasEndpoint.rest}/${id}/`;
    return this.http.get<IRecetas>(url);
  }


  addReceta(data: IRecetas): Observable<IRecetas> {
    const url = `${RecetasEndpoint.rest}/`;
    return this.http.post<IRecetas>(url, data);
  }

  updateReceta(id: number, data: IRecetas): Observable<IRecetas> {
    const url = `${RecetasEndpoint.rest}/${id}/`;
    return this.http.put<IRecetas>(url, data);
  }

  deleteReceta(id: number): Observable<any | null> {
    const url = `${RecetasEndpoint.rest}/${id}/`;
    return this.http.delete(url);
  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {MovmaterialdetalleEndpoint} from '../endpoints/movmaterial.endpoint';
import {IMovmaterialdetalle} from '../interfaces/movmaterial.interface';

@Injectable({
  providedIn: 'root'
})
export class MovmaterialdetalleService {
  constructor(private http: HttpClient) {
  }

  getMovmateriales(): Observable<Array<IMovmaterialdetalle>> {
    return this.http.get<Array<IMovmaterialdetalle>>(MovmaterialdetalleEndpoint.rest)
  }


  getMovmaterial(id: number): Observable<IMovmaterialdetalle> {
    const url = `${MovmaterialdetalleEndpoint.rest}/${id}`;
    return this.http.get<IMovmaterialdetalle>(url);
  }

  addMovmaterial(data: IMovmaterialdetalle): Observable<IMovmaterialdetalle> {
    return this.http.post<IMovmaterialdetalle>(MovmaterialdetalleEndpoint.rest, data);
  }

  updateMovmaterial(id: number, data: IMovmaterialdetalle): Observable<IMovmaterialdetalle> {
    const url = `${MovmaterialdetalleEndpoint.rest}/${id}`;
    return this.http.put<IMovmaterialdetalle>(url, data);
  }

  deleteMovmaterial(id: number): Observable<any | null> {
    const url = `${MovmaterialdetalleEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }
}

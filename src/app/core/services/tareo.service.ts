import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TareoEndpoint } from '../endpoints/tareo.endpoint';
import { Observable } from 'rxjs';
import { Tareo } from '../../dataservice/tareo';
import { ITareo } from '../interfaces/tareo.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TareoService {
  constructor(private http: HttpClient) {
  }

  getTareo(): Observable<Array<ITareo>> {
    return this.http.get<Array<ITareo>>(TareoEndpoint.rest)
  }

  getTareounico(id: number): Observable<Tareo> {
    const url = `${TareoEndpoint.rest}/${id}/`;
    return this.http.get<Tareo>(url);
  }


  addTareo(data: ITareo): Observable<ITareo> {
    const url = `${TareoEndpoint.rest}/`;
    return this.http.post<ITareo>(url, data);
  }

  updateTareo(id: number, data: ITareo): Observable<ITareo> {
    const url = `${TareoEndpoint.rest}/${id}/`;
    return this.http.put<ITareo>(url, data);
  }

  deleteTareo(id: number): Observable<any | null> {
    const url = `${TareoEndpoint.rest}/${id}/`;
    return this.http.delete(url);
  }


}

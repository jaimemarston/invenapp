import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { TareodetalleEndpoint } from '../endpoints/tareo.endpoint';
import { Observable } from 'rxjs';
import { Tareodetalle } from '../../dataservice/tareo';
import { ITareodetalle } from '../interfaces/tareo.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TareodetalleService {
  constructor(private http: HttpClient) {
  }

  getTareo(): Observable<Array<ITareodetalle>> {
    return this.http.get<Array<ITareodetalle>>(TareodetalleEndpoint.rest)
  }


  getTareounico(id: number): Observable<ITareodetalle> {
    const url = `${TareodetalleEndpoint.rest}/${id}`;
    return this.http.get<ITareodetalle>(url);
  }

  addTareo(data: ITareodetalle): Observable<ITareodetalle> {
    return this.http.post<ITareodetalle>(TareodetalleEndpoint.rest, data);
  }

  updateTareo(id: number, data: ITareodetalle): Observable<ITareodetalle> {
    const url = `${TareodetalleEndpoint.rest}/${id}`;
    return this.http.put<ITareodetalle>(url, data);
  }

  deleteTareo(id: number): Observable<any | null> {
    const url = `${TareodetalleEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }

  uploadFile(file: File): Observable<any>{
    const url = `${TareodetalleEndpoint.rest}/uploadfiles`;
    const data = new FormData();
    data.append('file', file);
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };
    return this.http.post(url, data, options);
  }

  
}

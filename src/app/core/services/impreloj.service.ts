import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ImprelojEndpoint } from '../endpoints/impreloj.endpoint';
import { Observable } from 'rxjs';
import { Impreloj } from '../../dataservice/impreloj';
import { IImpreloj } from '../interfaces/impreloj.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImprelojService {
  constructor(private http: HttpClient) {
  }

  getlista(): Observable<Array<IImpreloj>> {
    return this.http.get<Array<IImpreloj>>(ImprelojEndpoint.rest);
  }

  getunidad(id: number): Observable<Impreloj> {
    const url = `${ImprelojEndpoint.rest}/${id}`;
    return this.http.get<Impreloj>(url);
  }


  add(data: IImpreloj): Observable<IImpreloj> {
    return this.http.post<IImpreloj>(ImprelojEndpoint.rest, data);
  }

  update(id: number, data: IImpreloj): Observable<IImpreloj> {
    const url = `${ImprelojEndpoint.rest}/${id}`;
    return this.http.put<IImpreloj>(url, data);
  }

  delete(id: number): Observable<any | null> {
    const url = `${ImprelojEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }

  uploadFile(file: File): Observable<any>{
    const url = `${ImprelojEndpoint.rest}/uploadfiles`;
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

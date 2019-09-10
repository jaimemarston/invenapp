import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpctactedetalleEndpoint } from '../endpoints/empleados.endpoint';
import { Observable } from 'rxjs';
import { Empctactedetalle } from '../../dataservice/empleados';
import { IEmpctactedetalle } from '../interfaces/empleados.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpctactedetalleService {
  constructor(private http: HttpClient) {
  }

  getEmpctactes(): Observable<Array<IEmpctactedetalle>> {
    return this.http.get<Array<IEmpctactedetalle>>(EmpctactedetalleEndpoint.rest)
  }


  getEmpctacte(id: number): Observable<IEmpctactedetalle> {
    const url = `${EmpctactedetalleEndpoint.rest}/${id}`;
    return this.http.get<IEmpctactedetalle>(url);
  }

  addEmpctacte(data: IEmpctactedetalle): Observable<IEmpctactedetalle> {
    return this.http.post<IEmpctactedetalle>(EmpctactedetalleEndpoint.rest, data);
  }

  updateEmpctacte(id: number, data: IEmpctactedetalle): Observable<IEmpctactedetalle> {
    const url = `${EmpctactedetalleEndpoint.rest}/${id}`;
    return this.http.put<IEmpctactedetalle>(url, data);
  }

  deleteEmpctacte(id: number): Observable<any | null> {
    const url = `${EmpctactedetalleEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }
}

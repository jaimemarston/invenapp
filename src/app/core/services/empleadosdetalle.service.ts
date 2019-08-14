import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpleadodetalleEndpoint } from '../endpoints/empleados.endpoint';
import { Observable } from 'rxjs';
import { Empleadosdetalle } from '../../dataservice/empleados';
import { IEmpleadosdetalle } from '../interfaces/empleados.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosdetalleService {
  constructor(private http: HttpClient) {
  }

  getEmpleados(): Observable<Array<IEmpleadosdetalle>> {
    return this.http.get<Array<IEmpleadosdetalle>>(EmpleadodetalleEndpoint.rest)
  }


  getEmpleado(id: number): Observable<IEmpleadosdetalle> {
    const url = `${EmpleadodetalleEndpoint.rest}/${id}`;
    return this.http.get<IEmpleadosdetalle>(url);
  }

  addEmpleados(data: IEmpleadosdetalle): Observable<IEmpleadosdetalle> {
    return this.http.post<IEmpleadosdetalle>(EmpleadodetalleEndpoint.rest, data);
  }

  updateEmpleados(id: number, data: IEmpleadosdetalle): Observable<IEmpleadosdetalle> {
    const url = `${EmpleadodetalleEndpoint.rest}/${id}`;
    return this.http.put<IEmpleadosdetalle>(url, data);
  }

  deleteEmpleados(id: number): Observable<any | null> {
    const url = `${EmpleadodetalleEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }
}

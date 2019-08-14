import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpleadosEndpoint } from '../endpoints/empleados.endpoint';
import { Observable } from 'rxjs';
import { Empleados } from '../../dataservice/empleados';
import { IEmpleados } from '../interfaces/empleados.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  constructor(private http: HttpClient) {
  }

  getEmpleados(): Observable<Array<IEmpleados>> {
    return this.http.get<Array<IEmpleados>>(EmpleadosEndpoint.rest)
  }

  getEmpleado(id: number): Observable<Empleados> {
    const url = `${EmpleadosEndpoint.rest}/${id}/`;
    return this.http.get<Empleados>(url);
  }


  addEmpleado(data: IEmpleados): Observable<IEmpleados> {
    const url = `${EmpleadosEndpoint.rest}/`;
    return this.http.post<IEmpleados>(url, data);
  }

  updateEmpleado(id: number, data: IEmpleados): Observable<IEmpleados> {
    const url = `${EmpleadosEndpoint.rest}/${id}/`;
    return this.http.put<IEmpleados>(url, data);
  }

  deleteEmpleado(id: number): Observable<any | null> {
    const url = `${EmpleadosEndpoint.rest}/${id}/`;
    return this.http.delete(url);
  }


}

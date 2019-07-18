import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MaterialEndpoint } from '../endpoints/material.endpoint';
import { Observable } from 'rxjs';
import { Materiales } from '../../dataservice/materiales';
import { IMaterial } from '../interfaces/material.interface';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  constructor(private http: HttpClient) {
  }

  getMateriales(): Observable<Array<IMaterial>> {
    return this.http.get<Array<IMaterial>>(MaterialEndpoint.rest);
    
  }

  getMaterial(id: number): Observable<Materiales> {
    const url = `${MaterialEndpoint.rest}/${id}`;
    return this.http.get<Materiales>(url);
  }


  addMaterial(data: IMaterial): Observable<IMaterial> {
    return this.http.post<IMaterial>(MaterialEndpoint.rest, data);
  }

  updateMaterial(id: number, data: IMaterial): Observable<IMaterial> {
    const url = `${MaterialEndpoint.rest}/${id}`;
    return this.http.put<IMaterial>(url, data);
  }

  deleteMaterial(id: number): Observable<any | null> {
    const url = `${MaterialEndpoint.rest}/${id}`;
    return this.http.delete(url);
  }


}

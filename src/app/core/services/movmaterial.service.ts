import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MovmaterialEndpoint, ClientesdirecciondetailEndpoint} from '../endpoints/Movmaterial.endpoint';
import {Observable} from 'rxjs';
import {Movmaterial} from '../../dataservice/Movmaterial';
import {IMovmaterial, IMovmaterialEstados} from '../interfaces/Movmaterial.interface';
import {filter, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MovmaterialService {
    constructor(private http: HttpClient) {
    }

    getMovmateriales(): Observable<Array<IMovmaterial>> {
        return this.http.get<Array<IMovmaterial>>(MovmaterialEndpoint.rest);
    }

    getClientesdetail(): Observable<Array<any>> {
        return this.http.get<Array<any>>(ClientesdirecciondetailEndpoint.rest);
    }

    getMovmaterial(id: number): Observable<Movmaterial> {
        const url = `${MovmaterialEndpoint.rest}/${id}/`;
        return this.http.get<Movmaterial>(url);
    }

    addMovmaterial(data: IMovmaterial): Observable<IMovmaterial> {
        const url = `${MovmaterialEndpoint.rest}/`;
        return this.http.post<IMovmaterial>(url, data);
    }

    updateMovmaterial(id: number, data: IMovmaterial): Observable<IMovmaterial> {
        const url = `${MovmaterialEndpoint.rest}/${id}/`;
        console.log('envio update put url');
        console.log(url);
        return this.http.put<IMovmaterial>(url, data);
    }

    deleteMovmaterial(id: number): Observable<any | null> {
        const url = `${MovmaterialEndpoint.rest}/${id}/`;
        return this.http.delete(url);
    }

    estadosMovmaterial(): Observable<Array<IMovmaterialEstados>> {
        return this.http.get<Array<IMovmaterialEstados>>(MovmaterialEndpoint.estados);
    }


}

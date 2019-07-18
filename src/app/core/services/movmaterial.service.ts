import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {Movmaterial} from '../../dataservice/movmaterial';
import {IMovmaterial, IMovmaterialEstados} from '../interfaces/movmaterial.interface';
import {ClientesdirecciondetailEndpoint, MovmaterialEndpoint} from '../endpoints/movmaterial.endpoint';

@Injectable({
    providedIn: 'root'
})
export class MovmaterialService {
    constructor(private http: HttpClient) {
    }

    getMovmateriales(month?: number): Observable<Array<IMovmaterial>> {
        // return this.http.get<Array<IMovmaterial>>(MovmaterialEndpoint.rest);
        console.log('messelccionado', month);
        return this.http.get<Array<IMovmaterial>>(!month ? MovmaterialEndpoint.rest : `${MovmaterialEndpoint.rest}?month=${month}`);
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

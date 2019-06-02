import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReporteService {

    constructor(private http: HttpClient) {
    }

    getService(url: string, params?: { from: string, end: string }): Observable<any> {
        let queryParams = '';
        if (params) {
            queryParams = Object.keys(params).map(function (key) {
                return key + '=' + params[key];
            }).join('&');
        }
        return this.http.get(`${url}?${queryParams}`);
    }
}

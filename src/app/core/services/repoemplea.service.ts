import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RepoempleaService {

    constructor(private http: HttpClient) {
    }

    getService(url: string, params?: number): Observable<any> {
        // let queryParams = params;
        // if (params) {
        //     queryParams = Object.keys(params).map(function (key) {
        //         return key + '=' + params[key];
        //     }).join('&');
        // }
        console.log(url, params);
        return this.http.get(`${url}?${params}`);
    }
}

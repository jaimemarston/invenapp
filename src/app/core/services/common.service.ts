import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private snackBar: MatSnackBar, private http: HttpClient) {
    }


    showFormError(error: any): void {
        const formError = (error as any).error;
        if (formError) {
            const messageError = Object.keys(formError).map(k => `${k}: ${formError[k].map(kk => kk).join(',')}`);
            this.snackBar.open(`Los siguientes campos contienen errores:  ${messageError}`, '', {
                panelClass: 'red-bg'
            });
        } else {
            this.snackBar.open(`Formulario con error`, '', {
                panelClass: 'red-bg'
            });
        }
    }
}

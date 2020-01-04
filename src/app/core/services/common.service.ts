import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private snackBar: MatSnackBar, private http: HttpClient) {
    }

    static printElement(content: any): boolean {
        const mywindow = window.open('', 'Print');

        mywindow.document.write('<html><head><title>Print</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write(content.innerHTML);
        mywindow.document.write('</body></html>');

        mywindow.document.close();
        mywindow.focus();
        mywindow.print();
        mywindow.close();
        return true;
    }
    
    // saveButtonClick = () =>{
    //     let config = new MatSnackBarConfig();
    //     config.duration = 5000;
    //     config.panelClass = ['red-snackbar']
    //     this.snackBar.open("This is a message!", "ACTION", config);
    //   }
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

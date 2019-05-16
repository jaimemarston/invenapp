import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {fuseAnimations} from '../../../@fuse/animations';
import {BASEURL} from '../../../environments/environment';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ReporteService} from '../../core/services/reporte.service';
import to from 'await-to-js';

@Component({
    selector: 'app-reporte',
    templateUrl: './reporte.component.html',
    styleUrls: ['./reporte.component.scss'],
    animations: fuseAnimations
})
export class ReporteComponent implements OnInit, OnDestroy {
    listaReportesControl = new FormControl();
    @Input() urlPrint;
    listaReportes = [
        {
            name: '1.- Listado de productos',
            api: `${BASEURL}lista_articulos`,
            expandable: false,
            excel: 'xls_lista',
            display: 'False',
        },
        {
            name: '1.2.- Inventarios Inicial',
            api: '',
            expandable: false,
            excel: 'xls_invini',
            display: 'False',
        },
        {
            name: '1.3.- Kardex de Productos Detallado',
            api: `${BASEURL}lista_articulos_detalle`,
            expandable: true,
            excel: 'xls_proddetalle',
            display: 'True',
        },
        {
            name: '1.4.- Kardex de Productos Resumen',
            api: `${BASEURL}lista_stock`,
            expandable: false,
            excel: 'xls_stock',
            display: null
        },
        {
            name: '1.5.- Pago de Proveedores - Productos',
            api: `${BASEURL}lista_materiales`,
            expandable: false,
            excel: 'xls_lista_materiales',
            display: 'False',
        },
        {
            name: '2.- Listado de materiales',
            api: `${BASEURL}lista_materiales`,
            expandable: false,
            excel: 'xls_lista_materiales',
            display: 'False',
        },
        {
            name: '2.2.- Inventarios Inicial',
            api: '',
            expandable: false,
            excel: 'xls_invini_mat',
            display: 'False',
        },
        {
            name: '2.3.- Kardex de Materiales Detallado',
            api: `${BASEURL}lista_materiales_detalle`,
            expandable: true,
            excel: 'xls_matdetalle',
            display: 'True',
        },
        {
            name: '2.4.- Kardex de Materiales Resumen',
            api: `${BASEURL}lista_stock_mat`,
            expandable: false,
            excel: 'xls_stock_mat',
            display: null
        },
    ];

    reporteSelected: { name: string, api: string, expandable: boolean, excel: string, display?: any };

    unsubscribe = new Subject();


    headers: Array<string>;
    data: Array<any>;

    constructor(private reporteService: ReporteService) {
        this.listaReportesControl.valueChanges
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(value => {
                this.reporteSelected = value;
                this.getServiceFromUrl(this.reporteSelected.api);
            });
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    // imprime el urlPrint del html

    print_pdf(): void {
        console.log(`${BASEURL}${this.reporteSelected.excel}`);
        window.open(`${BASEURL}${this.reporteSelected.excel}`, '_blank');
    }

    reporte_visualizar(): void {
        
        console.log(`${BASEURL}filtro`);
        window.open(`${BASEURL}filtro/2019-05-10/2019-05-13/`, '_blank');
    }

    async getServiceFromUrl(url: string): Promise<void> {
        if (this.reporteSelected && this.reporteSelected.api) {
            const [error, response] = await to(this.reporteService.getService(url).toPromise());
            this.data = response;
            if (this.data && this.data.length) {
                this.headers = Object.keys(this.data[0]).filter(k => typeof this.data[0][k] !== 'object').map(k => k);
            }
        } else {
            this.headers = [];
            this.data = [];
        }
    }
}
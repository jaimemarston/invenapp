import {Component, OnDestroy, OnInit} from '@angular/core';
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
    listaReportes = [
        {
            name: 'Listado de productos',
            api: `${BASEURL}lista_articulos`,
            expandable: false
        },
        {
            name: 'Inventarios Inicial',
            api: '',
            expandable: false
        },
        {
            name: 'Kardex de Productos Detallado',
            api: `${BASEURL}lista_articulos_detalle`,
            expandable: true
        },
        {
            name: 'Kardex de Productos Resumen',
            api: `${BASEURL}lista_stock`,
            expandable: false
        },

    ];

    reporteSelected: { name: string, api: string, expandable: boolean };

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
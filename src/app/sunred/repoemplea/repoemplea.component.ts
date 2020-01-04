import { Component, OnDestroy, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { fuseAnimations } from '../../../@fuse/animations';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { BASEURL } from '../../../environments/environment';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ITareo } from '../../core/interfaces/tareo.interface';
import { TareoService } from '../../core/services/tareo.service';
import { startWith, takeUntil } from 'rxjs/operators';
import { RepoempleaService } from '../../core/services/repoemplea.service';
import { FuseProgressBarService } from '@fuse/services/progress-bar.service';
import { IArticulo } from '../../core/interfaces/articulo.interface';
import to from 'await-to-js';
import * as moment from 'moment';

@Component({
    selector: 'app-repoemplea',
    templateUrl: './repoemplea.component.html',
    styleUrls: ['./repoemplea.component.scss'],
    animations: fuseAnimations
})
export class RepoempleaComponent implements OnInit, OnDestroy {
    listaRepoempleaControl = new FormControl();

    fromControl = new FormControl('2019-01-01');

    endControl = new FormControl(moment(new Date()).format('YYYY-MM-DD'));


    @Output() inputText: EventEmitter<string> = new EventEmitter<string>();

    @Input() search = true;
    @Input() urlPrint;
    // listaRepoemplea = [ ];
    listaReportes = [
        {
            id: 1,
            name: 'Planilla',
            api: `${BASEURL}calcula_planilla`,
            expandable: false,
            excel: 'xls_planilla',
            display: 'False',
        }];

    repoempleaSelected: { id: number, name: string, api: string, expandable: boolean, excel: string, display?: any };

    unsubscribe = new Subject();

    loading: boolean;
    tareo: Array<ITareo>;
    dataSource = new MatTableDataSource<ITareo>();
    today = new Date().toISOString().split('T')[0];

    headers: Array<string>;
    data: Array<any>;


    queryParamsDate = { from: null, end: null };

    searchControl = new FormControl();

    dataFiltered: Array<any>;

    exclude_headers = ['query_search'];

    constructor(
        private tareoService: TareoService,
        private repoempleaService: RepoempleaService,
        private _fuseProgressBarService: FuseProgressBarService
    ) {

        this.listaRepoempleaControl.valueChanges
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(value => {
                this.repoempleaSelected = value;
                // this.getServiceFromUrl(this.repoempleaSelected.api);
            });

        // this.fromControl.valueChanges
        //     .pipe(startWith(this.fromControl.value))
        //     .subscribe(value => this.queryParamsDate.from = value);

        // this.endControl.valueChanges
        //     .pipe(startWith(this.endControl.value))
        //     .subscribe(value => this.queryParamsDate.end = value);
    }

    ngOnInit(): void {
        this.getTareo();
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    // imprime el urlPrint del html
    getTareo(): void {

        this.tareoService.getTareo()
            .subscribe(response => {
                this.tareo = response;
                this.dataSource.data = this.tareo;
                // this.dataSource.paginator = this.paginator;
                // this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
                // this.detalle.emit(this.tareo[0].tareoes);
                // this.updateTareoSelected(true);
            });
    }

    print_pdf(): void {
        console.log(`${BASEURL}${this.repoempleaSelected.excel}`);
        window.open(`${BASEURL}${this.repoempleaSelected.excel}`, '_blank');
    }

    repoemplea_visualizar(): void {
        // this.getServiceFromUrl(this.repoempleaSelected.api);
        console.log('NEW this.repoempleaSelected', this.repoempleaSelected.id);
        this.getServiceFromUrl(`${BASEURL}calcula_planilla`);
        console.log(`${BASEURL}calcula_planilla`);
        // window.open(`${BASEURL}filtro/2019-05-10/2019-05-13/`, '_blank');
    }

    private showLoader(): void {
        this.loading = true;
        // mode: 'determinate' | 'indeterminate' | 'buffer' | 'query'

        this._fuseProgressBarService.show();
        console.log('Show loader');
    }

    private hideLoader(): void {
        this.loading = false;
        this._fuseProgressBarService.hide();
        console.log('Hide loader');
    }

    printing(): void {


        const prtContent = document.getElementById('div_print');

        const getTbody = () => {

            const tbody = this.data.map(c => `<tr><td>${c.codigo}</td><td>${c.descripcion}</td>
            <td>${c.descolor}</td><td>${c.tipo}</td><td>${c.talla}</td><td>${c.unimed}</td><td>${c.precioventa}</td></tr>`).join('');
            return tbody;
        };
        prtContent.innerHTML = `
                         <h1>Relacion de Materiales</h1>  
                         <table border="1">
                          <thead><th>CODIGO</th><th>NOMBRE</th><th>COLOR</th><th>TIPO</th><th>TALLA</th><th>UM</th><th>precioventa</th></thead>
                          <tbody> ${getTbody()} </tbody>
                        </table>
                        <tfoot></tfoot>`;
        // CommonService.printElement(prtContent);
    }

    async getServiceFromUrl(url: string): Promise<void> {


        this.showLoader();
        const [error, response] = await to(this.repoempleaService.getService(url, this.repoempleaSelected.id).toPromise());
        this.data = response;
        
        // const total = this.data[8].reduce(function(sum, value){
        //     return sum + value;
        //    }, 0);

        // console.log('totalver', total);
        
        this.setSearchTextToData();
        if (this.data && this.data.length) {
            this.headers = Object.keys(this.data[0]).filter(k => typeof this.data[0][k] !== 'object' && this.exclude_headers.indexOf(k) === -1).map(k => k);
        }
        this.hideLoader();

        this.dataFiltered = [...this.data];
    }
    
    setSearchTextToData(): void {
        this.data = this.data.map(s => {
            s.query_search = Object.keys(s).map(k => `${s[k]}`.trim().toLowerCase()).join(' ');
            return s;
        });
    }

    applyFilter(queryString: string): void {
        this.dataFiltered = this.data.filter(s => s.query_search.includes(queryString.trim().toLowerCase()));
    }
}

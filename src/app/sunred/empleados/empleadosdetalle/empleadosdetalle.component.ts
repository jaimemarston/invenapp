import {Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from '@angular/router';
import {Empleados} from '../../../dataservice/empleados';
import {DataService} from '../../../dataservice/data.service';
import {EmpleadosdetalleService} from '../../../core/services/empleadosdetalle.service';
import {IEmpleadosdetalle} from '../../../core/interfaces/empleados.interface';
import {SelectionModel} from '@angular/cdk/collections';
import {fuseAnimations} from '../../../../@fuse/animations';
import {map} from 'rxjs/operators';

/**
 * @title Basic use of `<table mat-table>`
 */


@Component({
    selector: 'app-empleadosdetalle',
    templateUrl: './empleadosdetalle.component.html',
    animations: fuseAnimations
})

export class EmpleadosdetalleComponent implements OnInit {
    _empleadosDetalle: Array<IEmpleadosdetalle>;
    empleadosTotales = {
        subtotal: 0,
        descuento: 0,
        igv: 0,
        total_general: 0
    };

    get empleadosDetalle(): Array<IEmpleadosdetalle> {
        return this._empleadosDetalle;
    }

    @Input() set empleadosDetalle(data: Array<IEmpleadosdetalle>) {
        this._empleadosDetalle = data;
        this.dataSource.data = this.empleadosDetalle;
        if (this.empleadosDetalle) {
            this.dataSource.paginator = this.paginatordet;
        }
    }

    @Input() detail: any;

    @Input() idMaster: number;
    @Input() codempMaster: string;
    @Input() nombreMaster: string;
    
    @Output() updated: EventEmitter<any> = new EventEmitter();

    displayedColumns: string[] = ['select', 'codigo', 'codemp', 'nombre', 'fechaini', 'fechafin', 'importe', 'options'];
    @ViewChild(MatPaginator) paginatordet: MatPaginator;

    empleados: Array<IEmpleadosdetalle>;
    dataSource = new MatTableDataSource<IEmpleadosdetalle>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;

    /** checkbox datatable */
    selection = new SelectionModel<IEmpleadosdetalle>(true, []);

    constructor(
        private empleadosService: EmpleadosdetalleService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.dataSource.data = this.empleadosDetalle;
    }

    getEmpleados(): void {
        this.empleadosService.getEmpleados()
            .pipe(map(empleados => {
                empleados = empleados.map(c => {
                    return c;
                });
                return empleados;
            }))
            .subscribe(response => {
                this.empleados = response;
                this.dataSource.data = this.empleados;
                this.dataSource.paginator = this.paginatordet;
                this.paginatordet._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

    delete(id: number): void {
        this.selectedId = id;
        this.deleteEmpleados();
    }

    deleteEmpleados(): void {
        this.empleadosService.deleteEmpleados(this.selectedId)
            .subscribe(response => {
                this.updated.emit(true);
            });
    }

    public editRecord(id: number): void {
        this.selectedId = id;
        this.edit = true;
    }

    public addRecord(): void {
        console.log('addRecord', this.idMaster, this.nombreMaster);
        this.edit = true;
        this.selectedId = null;
    }

    showDataTable(): void {
        this.edit = false;
    }

    updateDataTable(data: IEmpleadosdetalle): void {
        this.updated.emit(data);
        this.paginatordet.lastPage();
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle(): void {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }


    openPrint(): void {
        window.print();
    }

    /**
     * async await sirve para esperar que una promesa sea cumplida
     * */
    async deleteAllSelecteds(): Promise<void> {
        const selecteds = this.selection.selected;
        for (let index = 0; index < selecteds.length; index++) {
            await this.empleadosService.deleteEmpleados(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELIMINADOS TODOS');
                this.updated.emit(true);
            }
        }
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    // calculateTotales(descuento = 0): void {
    //     this.empleadosTotales.descuento = descuento;
    //     /*this.empleadosTotales.subtotal = this.empleadosDetalle.reduce((a, b) => (b.imptotal * b.cantidad) + a, 0);*/
    //     this.empleadosTotales.subtotal = this.empleadosDetalle.reduce((a, b) => (b.imptotal), 0);
    //     this.empleadosTotales.total_general = (this.empleadosTotales.subtotal - this.empleadosTotales.descuento) + this.empleadosTotales.igv;
    //     this.empleadosTotales.igv = (this.empleadosTotales.subtotal - this.empleadosTotales.descuento) * 0.18;
    // }

    // onChangeDscto(event): void {
    //     this.calculateTotales(+(event.target.value ? event.target.value !== '' : 0));
    // }
}

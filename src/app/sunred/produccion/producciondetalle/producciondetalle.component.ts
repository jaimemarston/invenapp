import {Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from '@angular/router';
import {Produccion} from '../../../dataservice/produccion';
import {DataService} from '../../../dataservice/data.service';
import {ProducciondetalleService} from '../../../core/services/producciondetalle.service';
import {IProducciondetalle} from '../../../core/interfaces/produccion.interface';
import {SelectionModel} from '@angular/cdk/collections';
import {fuseAnimations} from '../../../../@fuse/animations';
import {map} from 'rxjs/operators';

/**
 * @title Basic use of `<table mat-table>`
 */


@Component({
    selector: 'app-producciondetalle',
    templateUrl: './producciondetalle.component.html',
    animations: fuseAnimations
})

export class ProducciondetalleComponent implements OnInit {
    _produccionDetalle: Array<IProducciondetalle>;
    produccionTotales = {
        subtotal: 0,
        descuento: 0,
        igv: 0,
        total_general: 0
    };

    get produccionDetalle(): Array<IProducciondetalle> {
        return this._produccionDetalle;
    }

    @Input() set produccionDetalle(data: Array<IProducciondetalle>) {
        this._produccionDetalle = data;
        this.dataSource.data = this.produccionDetalle;
        if (this.produccionDetalle) {
            this.dataSource.paginator = this.paginatordet;
        }
    }

    @Input() detail: any;

    @Input() idMaster: number;
    @Input() codempMaster: string;
    @Input() nombreMaster: string;
    
    @Output() updated: EventEmitter<any> = new EventEmitter();

    displayedColumns: string[] = ['select', 'codigo', 'nombre', 'cc', 'descc', 'cantidad',  'options'];
    @ViewChild(MatPaginator) paginatordet: MatPaginator;

    produccion: Array<IProducciondetalle>;
    dataSource = new MatTableDataSource<IProducciondetalle>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;

    /** checkbox datatable */
    selection = new SelectionModel<IProducciondetalle>(true, []);

    constructor(
        private produccionService: ProducciondetalleService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.dataSource.data = this.produccionDetalle;
    }

    getAll(): void {
        this.produccionService.getAll()
            .pipe(map(produccion => {
                produccion = produccion.map(c => {
                    return c;
                });
                return produccion;
            }))
            .subscribe(response => {
                this.produccion = response;
                this.dataSource.data = this.produccion;
                this.dataSource.paginator = this.paginatordet;
                this.paginatordet._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

    delete(id: number): void {
        this.selectedId = id;
        this.deleteProduccion();
    }

    deleteProduccion(): void {
        this.produccionService.deleteProduccion(this.selectedId)
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

    updateDataTable(data: IProducciondetalle): void {
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
            await this.produccionService.deleteProduccion(selecteds[index].id).toPromise();
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
    //     this.produccionTotales.descuento = descuento;
    //     /*this.produccionTotales.subtotal = this.produccionDetalle.reduce((a, b) => (b.imptotal * b.cantidad) + a, 0);*/
    //     this.produccionTotales.subtotal = this.produccionDetalle.reduce((a, b) => (b.imptotal), 0);
    //     this.produccionTotales.total_general = (this.produccionTotales.subtotal - this.produccionTotales.descuento) + this.produccionTotales.igv;
    //     this.produccionTotales.igv = (this.produccionTotales.subtotal - this.produccionTotales.descuento) * 0.18;
    // }

    // onChangeDscto(event): void {
    //     this.calculateTotales(+(event.target.value ? event.target.value !== '' : 0));
    // }
}

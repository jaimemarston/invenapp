import {Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from '@angular/router';
import {Recetas} from '../../../dataservice/recetas';
import {DataService} from '../../../dataservice/data.service';
import {RecetasdetalleService} from '../../../core/services/recetasdetalle.service';
import {IRecetasdetalle} from '../../../core/interfaces/recetas.interface';
import {SelectionModel} from '@angular/cdk/collections';
import {fuseAnimations} from '../../../../@fuse/animations';
import {map} from 'rxjs/operators';

/**
 * @title Basic use of `<table mat-table>`
 */


@Component({
    selector: 'app-recetasdetalle',
    templateUrl: './recetasdetalle.component.html',
    animations: fuseAnimations
})

export class RecetasdetalleComponent implements OnInit {
    _recetasDetalle: Array<IRecetasdetalle>;
    recetasTotales = {
        subtotal: 0,
        descuento: 0,
        igv: 0,
        total_general: 0
    };

    get recetasDetalle(): Array<IRecetasdetalle> {
        return this._recetasDetalle;
    }

    @Input() set recetasDetalle(data: Array<IRecetasdetalle>) {
        this._recetasDetalle = data;
        this.dataSource.data = this.recetasDetalle;
        if (this.recetasDetalle) {
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

    recetas: Array<IRecetasdetalle>;
    dataSource = new MatTableDataSource<IRecetasdetalle>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;

    /** checkbox datatable */
    selection = new SelectionModel<IRecetasdetalle>(true, []);

    constructor(
        private recetasService: RecetasdetalleService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.dataSource.data = this.recetasDetalle;
    }

    getRecetas(): void {
        this.recetasService.getRecetas()
            .pipe(map(recetas => {
                recetas = recetas.map(c => {
                    return c;
                });
                return recetas;
            }))
            .subscribe(response => {
                this.recetas = response;
                this.dataSource.data = this.recetas;
                this.dataSource.paginator = this.paginatordet;
                this.paginatordet._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

    delete(id: number): void {
        this.selectedId = id;
        this.deleteRecetas();
    }

    deleteRecetas(): void {
        this.recetasService.deleteRecetas(this.selectedId)
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

    updateDataTable(data: IRecetasdetalle): void {
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
            await this.recetasService.deleteRecetas(selecteds[index].id).toPromise();
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
    //     this.recetasTotales.descuento = descuento;
    //     /*this.recetasTotales.subtotal = this.recetasDetalle.reduce((a, b) => (b.imptotal * b.cantidad) + a, 0);*/
    //     this.recetasTotales.subtotal = this.recetasDetalle.reduce((a, b) => (b.imptotal), 0);
    //     this.recetasTotales.total_general = (this.recetasTotales.subtotal - this.recetasTotales.descuento) + this.recetasTotales.igv;
    //     this.recetasTotales.igv = (this.recetasTotales.subtotal - this.recetasTotales.descuento) * 0.18;
    // }

    // onChangeDscto(event): void {
    //     this.calculateTotales(+(event.target.value ? event.target.value !== '' : 0));
    // }
}

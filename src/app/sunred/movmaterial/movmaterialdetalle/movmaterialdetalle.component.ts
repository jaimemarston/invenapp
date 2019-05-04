import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { Movmaterial} from '../../../dataservice/movmaterial';
import { DataService } from '../../../dataservice/data.service';
import { MovmaterialdetalleService } from '../../../core/services/movmaterialdetalle.service';
import { IMovmaterialdetalle } from '../../../core/interfaces/movmaterial.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { fuseAnimations } from '../../../../@fuse/animations';
import { map } from 'rxjs/operators';

/**
 * @title Basic use of `<table mat-table>`
 */


@Component({
    selector: 'app-movmaterialdetalle',
    templateUrl: './movmaterialdetalle.component.html',
    animations: fuseAnimations
})

export class MovmaterialdetalleComponent implements OnInit {
    _movmaterialDetalle: Array<IMovmaterialdetalle>;
    movmaterialTotales = {
        subtotal: 0,
        descuento: 0,
        igv: 0,
        total_general: 0
    }

    get movmaterialDetalle(): Array<IMovmaterialdetalle> {
        return this._movmaterialDetalle;
    }

    @Input() set movmaterialDetalle(data: Array<IMovmaterialdetalle>) {
        this._movmaterialDetalle = data;
        
        this.dataSource.data = this.movmaterialDetalle;
        if (this.movmaterialDetalle) {
            this.calculateTotales(0);
        }
    }

    @Input() detail: any;

    @Input() idMaster: number;

    @Output() updated: EventEmitter<any> = new EventEmitter();

    displayedColumns: string[] = ['select', 'descripcion', 'desunimed', 'cantidad', 'imptotal', 'options']
    @ViewChild(MatPaginator) paginatordet: MatPaginator;

    movmaterial: Array<IMovmaterialdetalle>;
    dataSource = new MatTableDataSource<IMovmaterialdetalle>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;

    /** checkbox datatable */
    selection = new SelectionModel<IMovmaterialdetalle>(true, []);

    constructor(
        private movmaterialService: MovmaterialdetalleService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.dataSource.data = this.movmaterialDetalle;
    }

    getMovmaterial(): void {
        this.movmaterialService.getMovmateriales()
            .pipe(map(movmaterial => {
                movmaterial = movmaterial.map(c => {
                    /*c.imptotal = c.cantidad * c.precio;*/
                    c.imptotal = c.precio;
                    return c;
                });
                return movmaterial;
            }))
            .subscribe(response => {
                this.movmaterial = response;
                this.dataSource.data = this.movmaterial;
                this.dataSource.paginator = this.paginatordet;
                this.paginatordet._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

    delete(id: number): void {
        this.selectedId = id;
        this.deleteMovmaterial();
    }

    deleteMovmaterial(): void {
        this.movmaterialService.deleteMovmaterial(this.selectedId)
            .subscribe(response => {
                this.updated.emit(true);
            });
    }

    public editRecord(id: number): void {
        this.selectedId = id;
        this.edit = true;
    }

    public addRecord(): void {
        this.edit = true;
        this.selectedId = null;
    }

    showDataTable(): void {
        this.edit = false;
    }

    updateDataTable(data: IMovmaterialdetalle): void {
        this.updated.emit(data);
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
            await this.movmaterialService.deleteMovmaterial(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELIMINADOS TODOS');
                
                this.updated.emit(true);
            }
        }
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    calculateTotales(descuento = 0): void {
        this.movmaterialTotales.descuento = descuento;
        
        this.movmaterialTotales.subtotal = this.movmaterialDetalle.reduce((a, b) => (b.imptotal), 0);
        this.movmaterialTotales.total_general = (this.movmaterialTotales.subtotal - this.movmaterialTotales.descuento) + this.movmaterialTotales.igv;
        this.movmaterialTotales.igv = (this.movmaterialTotales.subtotal - this.movmaterialTotales.descuento) * 0.18;
    }

    onChangeDscto(event): void {
        this.calculateTotales(+(event.target.value ? event.target.value !== '' : 0));
    }
}

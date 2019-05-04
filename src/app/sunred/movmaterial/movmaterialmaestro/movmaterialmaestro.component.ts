import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { IMovmaterial, IMovmaterialdetalle } from '../../../core/interfaces/movmaterial.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { MovmaterialdetalleService } from '../../../core/services/movmaterialdetalle.service';
import { MovmaterialdetalleComponent } from '../movmaterialdetalle/movmaterialdetalle.component';
import {MovmaterialService} from '../../../core/services/movmaterial.service';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-movmaterialmaestro',
    templateUrl: './movmaterialmaestro.component.html',
})

export class MovmaterialmaestroComponent implements OnInit {

    displayedColumns: string[] = ['select', 'codigo', 'fechadoc', 'ruc', 'desruc', 'telruc', 'correoruc', 'estado', 'options'];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    movmaterial: Array<IMovmaterial>;
    movmaterialdetalle: Array<IMovmaterialdetalle>;
    movmaterialSelected: IMovmaterial;
    dataSource = new MatTableDataSource<IMovmaterial>();
    dataSourceDetalle = new MatTableDataSource<IMovmaterialdetalle>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;
    @Output() shower: EventEmitter<any> = new EventEmitter();
    @Output() detalle: EventEmitter<Array<IMovmaterialdetalle>> = new EventEmitter();

    /** checkbox datatable */
    selection = new SelectionModel<IMovmaterial>(true, []);

    constructor(
        private movmaterialService: MovmaterialService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private movmaterialServicedetalle: MovmaterialdetalleService,
    ) {
    }

    ngOnInit(): void {
        this.getMovmaterial();
    }

    getMovmaterial(): void {

        this.movmaterialService.getMovmateriales()
            .subscribe(response => {
                this.movmaterial = response;
                this.dataSource.data = this.movmaterial;
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
                
                this.updateMovmaterialSelected(true);
            });
    }

    updateMovmaterialSelected(emit?: boolean) {
        if (this.movmaterialSelected) {
            this.movmaterialSelected = this.movmaterial.find((v, i) => v.id === this.movmaterialSelected.id);
        } else {
            this.movmaterialSelected = this.movmaterial[0];
        }
        if (emit) {
            this.detalle.emit(this.movmaterialSelected ? this.movmaterialSelected.materiales : []);
        }
    }

    viewRecorddetail(movmaterial: IMovmaterial): void {
        this.selectedId = movmaterial.id;
        this.movmaterialSelected = movmaterial;
        this.detalle.emit(this.movmaterialSelected.materiales);
    }

    delete(id: number): void {
        this.selectedId = id;
        this.deleteMovmaterial();
    }

    deleteMovmaterial(): void {
        if (confirm('Esta seguro que desea borrar este registro?')) {
            this.movmaterialService.deleteMovmaterial(this.selectedId)
                .subscribe(response => {
                    /* console.log(response); */
                    this.getMovmaterial();
                });
        }
    }
    
    public editRecord(row: any): void {
        this.selectedId = row.id;
        this.edit = true;
    }

    public addRecord(): void {
        this.edit = true;
        this.selectedId = null;
    }

    showDataTable(): void {
        this.edit = false;
    }

    updateDataTable(data: IMovmaterial): void {
        this.getMovmaterial();
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }


    openPrint() {
        window.print();
    }

    /**
     * async await sirve para esperar que una promesa sea cumplida
     * */
    async deleteAllSelecteds() {
        const selecteds = this.selection.selected;
        for (let index = 0; index < selecteds.length; index++) {
            await this.movmaterialService.deleteMovmaterial(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELMINADOS TODOS');
                this.getMovmaterial();
            }
        }
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}

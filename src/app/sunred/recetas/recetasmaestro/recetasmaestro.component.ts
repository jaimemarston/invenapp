import {Component, OnInit, ViewChild, EventEmitter, Output, OnDestroy} from '@angular/core';
import {MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from '@angular/router';
import {Recetas} from '../../../dataservice/recetas';
import {DataService} from '../../../dataservice/data.service';
import {RecetaService} from '../../../core/services/recetas.service';
import {IRecetas, IRecetasdetalle} from '../../../core/interfaces/recetas.interface';
import {SelectionModel} from '@angular/cdk/collections';
import {RecetasdetalleService} from '../../../core/services/recetasdetalle.service';
import {RecetasdetalleComponent} from '../recetasdetalle/recetasdetalle.component';
import {IProveedores} from 'app/core/interfaces/proveedores.interface';
import {MonthService} from '../../../shared/components/footer/month.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-recetasmaestro',
    templateUrl: './recetasmaestro.component.html',
})

export class RecetasmaestroComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ['select', 'codigo', 'nombre' , 'telefono1', 'direccion', 'options'];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    recetas: Array<IRecetas>;
    recetasdetalle: Array<IRecetasdetalle>;
    recetasSelected: IRecetas;
    dataSource = new MatTableDataSource<IRecetas>();
    dataSourceDetalle = new MatTableDataSource<IRecetasdetalle>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;
    @Output() shower: EventEmitter<any> = new EventEmitter();
    @Output() detalle: EventEmitter<Array<IRecetasdetalle>> = new EventEmitter();


    /** checkbox datatable */
    selection = new SelectionModel<IRecetas>(true, []);

    monthSelected: number;

    unsubscribe = new Subject();

    constructor(
        private recetasService: RecetaService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private recetasServicedetalle: RecetasdetalleService,
        private monthService: MonthService
    ) {
        this.monthService.monthSelected
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(month => {
                this.monthSelected = month;
                this.getReceta();
            });
    }

    ngOnInit(): void {
        this.getReceta();
    }


    getReceta(): void {

        this.recetasService.getRecetas()
            .subscribe(response => {
                this.recetas = response;
                // this.recetasSelected = this.recetas[0];
                this.dataSource.data = this.recetas;
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
                // this.detalle.emit(this.recetas[0].recetases);
                this.updateRecetaSelected(true);
            });
    }


    updateRecetaSelected(emit?: boolean): void {
       
        if (this.recetasSelected) {
            this.recetasSelected = this.recetas.find((v, i) => v.id === this.recetasSelected.id);
        } else {
            this.recetasSelected = this.recetas[0];
        }
        if (emit) {
           
            this.detalle.emit(this.recetasSelected ? this.recetasSelected.movrecetas : []);
        }
    }

    viewRecorddetail(recetas: IRecetas): void {
        this.selectedId = recetas.id;
        // console.log('viewRecorddetail', this.selectedId, recetas);
        this.recetasSelected = recetas;
        this.detalle.emit(this.recetasSelected.movrecetas);
    }

    delete(id: number): void {
        this.selectedId = id;
        this.deleteReceta();
    }

    deleteReceta(): void {
        if (confirm('Esta seguro que desea borrar este registro?')) {
            this.recetasService.deleteReceta(this.selectedId)
                .subscribe(response => {
                    /* console.log(response); */
                    this.getReceta();
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

    updateDataTable(data: IRecetas): void {
        this.getReceta();
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
            await this.recetasService.deleteReceta(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELMINADOS TODOS');
                this.getReceta();
            }
        }
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
    
}

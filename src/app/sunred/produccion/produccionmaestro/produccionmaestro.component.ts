import {Component, OnInit, ViewChild, EventEmitter, Output, OnDestroy} from '@angular/core';
import {MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from '@angular/router';
import {Produccion} from '../../../dataservice/produccion';
import {DataService} from '../../../dataservice/data.service';
import {ProduccionService} from '../../../core/services/produccion.service';
import {IProduccion, IProducciondetalle} from '../../../core/interfaces/produccion.interface';
import {SelectionModel} from '@angular/cdk/collections';
import {ProducciondetalleService} from '../../../core/services/producciondetalle.service';
import {ProducciondetalleComponent} from '../producciondetalle/producciondetalle.component';
import {IProveedores} from 'app/core/interfaces/proveedores.interface';
import {MonthService} from '../../../shared/components/footer/month.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-produccionmaestro',
    templateUrl: './produccionmaestro.component.html',
})

export class ProduccionmaestroComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ['select', 'codigo', 'nombre' , 'cantidad', 'options'];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    produccion: Array<IProduccion>;
    producciondetalle: Array<IProducciondetalle>;
    produccionSelected: IProduccion;
    dataSource = new MatTableDataSource<IProduccion>();
    dataSourceDetalle = new MatTableDataSource<IProducciondetalle>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;
    @Output() shower: EventEmitter<any> = new EventEmitter();
    @Output() detalle: EventEmitter<Array<IProducciondetalle>> = new EventEmitter();


    /** checkbox datatable */
    selection = new SelectionModel<IProduccion>(true, []);

    monthSelected: number;

    unsubscribe = new Subject();

    constructor(
        private produccionService: ProduccionService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private produccionServicedetalle: ProducciondetalleService,
        private monthService: MonthService
    ) {
        this.monthService.monthSelected
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(month => {
                this.monthSelected = month;
                this.getProduccion();
            });
    }

    ngOnInit(): void {
        this.getProduccion();
    }


    getProduccion(): void {

        this.produccionService.getAll()
            .subscribe(response => {
                this.produccion = response;
                // this.produccionSelected = this.produccion[0];
                this.dataSource.data = this.produccion;
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
                // this.detalle.emit(this.produccion[0].producciones);
                this.updateProduccionSelected(true);
            });
    }


    updateProduccionSelected(emit?: boolean): void {
       
        if (this.produccionSelected) {
            this.produccionSelected = this.produccion.find((v, i) => v.id === this.produccionSelected.id);
        } else {
            this.produccionSelected = this.produccion[0];
        }
        if (emit) {
           
            this.detalle.emit(this.produccionSelected ? this.produccionSelected.movproduccion : []);
        }
    }

    viewRecorddetail(produccion: IProduccion): void {
        this.selectedId = produccion.id;
        // console.log('viewRecorddetail', this.selectedId, produccion);
        this.produccionSelected = produccion;
        this.detalle.emit(this.produccionSelected.movproduccion);
    }

    delete(id: number): void {
        this.selectedId = id;
        this.deleteProduccion();
    }

    deleteProduccion(): void {
        if (confirm('Esta seguro que desea borrar este registro?')) {
            this.produccionService.deleteProduccion(this.selectedId)
                .subscribe(response => {
                    /* console.log(response); */
                    this.getProduccion();
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

    updateDataTable(data: IProduccion): void {
        this.getProduccion();
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
            await this.produccionService.deleteProduccion(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELMINADOS TODOS');
                this.getProduccion();
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

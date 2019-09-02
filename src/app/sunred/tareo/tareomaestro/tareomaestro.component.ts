import {Component, OnInit, ViewChild, EventEmitter, Output, OnDestroy} from '@angular/core';
import {MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from '@angular/router';
import {Tareo} from '../../../dataservice/tareo';
import {DataService} from '../../../dataservice/data.service';
import {TareoService} from '../../../core/services/tareo.service';
import {ITareo, ITareodetalle} from '../../../core/interfaces/tareo.interface';
import {SelectionModel} from '@angular/cdk/collections';
import {TareodetalleService} from '../../../core/services/tareodetalle.service';
import {TareodetalleComponent} from '../tareodetalle/tareodetalle.component';
import {IProveedores} from 'app/core/interfaces/proveedores.interface';
import {MonthService} from '../../../shared/components/footer/month.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-tareomaestro',
    templateUrl: './tareomaestro.component.html',
})

export class TareomaestroComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ['select', 'codigo', 'nombre' , 'nsemana', 'fechaini', 'fechafin', 'options'];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    tareo: Array<ITareo>;
    tareodetalle: Array<ITareodetalle>;
    tareoSelected: ITareo;
    dataSource = new MatTableDataSource<ITareo>();
    dataSourceDetalle = new MatTableDataSource<ITareodetalle>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;
    @Output() shower: EventEmitter<any> = new EventEmitter();
    @Output() detalle: EventEmitter<Array<ITareodetalle>> = new EventEmitter();


    /** checkbox datatable */
    selection = new SelectionModel<ITareo>(true, []);

    monthSelected: number;

    unsubscribe = new Subject();

    constructor(
        private tareoService: TareoService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private tareoServicedetalle: TareodetalleService,
        private monthService: MonthService
    ) {
        this.monthService.monthSelected
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(month => {
                this.monthSelected = month;
                this.getTareo();
            });
    }

    ngOnInit(): void {
        this.getTareo();
    }


    getTareo(): void {

        this.tareoService.getTareo()
            .subscribe(response => {
                this.tareo = response;
                // this.tareoSelected = this.tareo[0];
                this.dataSource.data = this.tareo;
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
                // this.detalle.emit(this.tareo[0].tareoes);
                this.updateTareoSelected(true);
            });
    }


    updateTareoSelected(emit?: boolean): void {
       
        if (this.tareoSelected) {
            this.tareoSelected = this.tareo.find((v, i) => v.id === this.tareoSelected.id);
        } else {
            this.tareoSelected = this.tareo[0];
        }
        if (emit) {
           
            this.detalle.emit(this.tareoSelected ? this.tareoSelected.movreloj : []);
        }
    }

    viewRecorddetail(tareo: ITareo): void {
        this.selectedId = tareo.id;
        // console.log('viewRecorddetail', this.selectedId, tareo);
        this.tareoSelected = tareo;
        this.detalle.emit(this.tareoSelected.movreloj);
    }

    delete(id: number): void {
        this.selectedId = id;
        this.deleteTareo();
    }

    deleteTareo(): void {
        if (confirm('Esta seguro que desea borrar este registro?')) {
            this.tareoService.deleteTareo(this.selectedId)
                .subscribe(response => {
                    /* console.log(response); */
                    this.getTareo();
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

    updateDataTable(data: ITareo): void {
        this.getTareo();
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
            await this.tareoService.deleteTareo(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELMINADOS TODOS');
                this.getTareo();
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

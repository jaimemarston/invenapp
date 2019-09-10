import {Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from '@angular/router';
import {DataService} from '../../../dataservice/data.service';
import {EmpctactedetalleService} from '../../../core/services/empctactedetalle.service';
import {IEmpctactedetalle} from '../../../core/interfaces/empleados.interface';
import {SelectionModel} from '@angular/cdk/collections';
import {fuseAnimations} from '../../../../@fuse/animations';
import {map} from 'rxjs/operators';

/**
 * @title Basic use of `<table mat-table>`
 */


@Component({
    selector: 'app-empctactedetalle',
    templateUrl: './empctactedetalle.component.html',
    animations: fuseAnimations
})

export class EmpctactedetalleComponent implements OnInit {
    _empctacteDetalle: Array<IEmpctactedetalle>;
    empctacteTotales = {
        subtotal: 0,
        descuento: 0,
        igv: 0,
        total_general: 0
    };

    get empctacteDetalle(): Array<IEmpctactedetalle> {
        return this._empctacteDetalle;
    }

    @Input() set empctacteDetalle(data: Array<IEmpctactedetalle>) {
        this._empctacteDetalle = data;
        this.dataSource.data = this.empctacteDetalle;
        if (this.empctacteDetalle) {
            this.dataSource.paginator = this.paginatordet;
        }
    }

    @Input() detail: any;

    @Input() idMaster: number;
    @Input() codempMaster: string;
    @Input() nombreMaster: string;
    
    @Output() updated: EventEmitter<any> = new EventEmitter();

    displayedColumns: string[] = ['select', 'codigo', 'codemp', 'nombre', 'codctacte', 'desctacte', 'fechaini', 'fechafin', 'importe', 'options'];
    @ViewChild(MatPaginator) paginatordet: MatPaginator;

    empctacte: Array<IEmpctactedetalle>;
    dataSource = new MatTableDataSource<IEmpctactedetalle>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;

    /** checkbox datatable */
    selection = new SelectionModel<IEmpctactedetalle>(true, []);

    constructor(
        private empctacteService: EmpctactedetalleService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.dataSource.data = this.empctacteDetalle;
    }

    getEmpctactes(): void {
        this.empctacteService.getEmpctactes()
            .pipe(map(empctacte => {
                empctacte = empctacte.map(c => {
                    return c;
                });
                return empctacte;
            }))
            .subscribe(response => {
                this.empctacte = response;
                this.dataSource.data = this.empctacte;
                this.dataSource.paginator = this.paginatordet;
                this.paginatordet._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

    delete(id: number): void {
        this.selectedId = id;
        this.deleteEmpctacte();
    }

    deleteEmpctacte(): void {
        this.empctacteService.deleteEmpctacte(this.selectedId)
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

    updateDataTable(data: IEmpctactedetalle): void {
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
            await this.empctacteService.deleteEmpctacte(selecteds[index].id).toPromise();
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
    //     this.empctacteTotales.descuento = descuento;
    //     /*this.empctacteTotales.subtotal = this.empctacteDetalle.reduce((a, b) => (b.imptotal * b.cantidad) + a, 0);*/
    //     this.empctacteTotales.subtotal = this.empctacteDetalle.reduce((a, b) => (b.imptotal), 0);
    //     this.empctacteTotales.total_general = (this.empctacteTotales.subtotal - this.empctacteTotales.descuento) + this.empctacteTotales.igv;
    //     this.empctacteTotales.igv = (this.empctacteTotales.subtotal - this.empctacteTotales.descuento) * 0.18;
    // }

    // onChangeDscto(event): void {
    //     this.calculateTotales(+(event.target.value ? event.target.value !== '' : 0));
    // }
}

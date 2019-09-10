import {Component, OnInit, ViewChild, EventEmitter, Output, OnDestroy} from '@angular/core';
import {MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from '@angular/router';
import {Empleados} from '../../../dataservice/empleados';
import {DataService} from '../../../dataservice/data.service';
import {EmpleadoService} from '../../../core/services/empleado.service';
import {IEmpleados, IEmpctactedetalle} from '../../../core/interfaces/empleados.interface';
import {SelectionModel} from '@angular/cdk/collections';
import {EmpctactedetalleService} from '../../../core/services/empctactedetalle.service';
import {IProveedores} from 'app/core/interfaces/proveedores.interface';
import {MonthService} from '../../../shared/components/footer/month.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-empleadosmaestro',
    templateUrl: './empleadosmaestro.component.html',
})

export class EmpleadosmaestroComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ['select', 'codigo', 'nombre' , 'telefono1', 'direccion', 'options'];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    empleados: Array<IEmpleados>;
    empleadosdetalle: Array<IEmpctactedetalle>;
    empleadosSelected: IEmpleados;
    dataSource = new MatTableDataSource<IEmpleados>();
    dataSourceDetalle = new MatTableDataSource<IEmpctactedetalle>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;
    @Output() shower: EventEmitter<any> = new EventEmitter();
    @Output() detalle: EventEmitter<Array<IEmpctactedetalle>> = new EventEmitter();


    /** checkbox datatable */
    selection = new SelectionModel<IEmpleados>(true, []);

    monthSelected: number;

    unsubscribe = new Subject();

    constructor(
        private empleadosService: EmpleadoService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private empleadosServicedetalle: EmpctactedetalleService,
        private monthService: MonthService
    ) {
        this.monthService.monthSelected
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(month => {
                this.monthSelected = month;
                this.getEmpleado();
            });
    }

    ngOnInit(): void {
        this.getEmpleado();
    }


    getEmpleado(): void {

        this.empleadosService.getEmpleados()
            .subscribe(response => {
                this.empleados = response;
                // this.empleadosSelected = this.empleados[0];
                this.dataSource.data = this.empleados;
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
                // this.detalle.emit(this.empleados[0].empleadoses);
                this.updateEmpleadoSelected(true);
            });
    }


    updateEmpleadoSelected(emit?: boolean): void {
       
        if (this.empleadosSelected) {
            this.empleadosSelected = this.empleados.find((v, i) => v.id === this.empleadosSelected.id);
        } else {
            this.empleadosSelected = this.empleados[0];
        }
        if (emit) {
           
            this.detalle.emit(this.empleadosSelected ? this.empleadosSelected.ctacte : []);
        }
    }

    viewRecorddetail(empleados: IEmpleados): void {
        this.selectedId = empleados.id;
        // console.log('viewRecorddetail', this.selectedId, empleados);
        this.empleadosSelected = empleados;
        this.detalle.emit(this.empleadosSelected.ctacte);
    }

    delete(id: number): void {
        this.selectedId = id;
        this.deleteEmpleado();
    }

    deleteEmpleado(): void {
        if (confirm('Esta seguro que desea borrar este registro?')) {
            this.empleadosService.deleteEmpleado(this.selectedId)
                .subscribe(response => {
                    /* console.log(response); */
                    this.getEmpleado();
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

    updateDataTable(data: IEmpleados): void {
        this.getEmpleado();
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
            await this.empleadosService.deleteEmpleado(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELMINADOS TODOS');
                this.getEmpleado();
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

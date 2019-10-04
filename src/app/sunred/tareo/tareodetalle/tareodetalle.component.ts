import {Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatSnackBar, MatTabChangeEvent, MatTableDataSource, MatPaginator} from '@angular/material';
import {Router} from '@angular/router';
import {Tareo} from '../../../dataservice/tareo';
import {DataService} from '../../../dataservice/data.service';
import {TareodetalleService} from '../../../core/services/tareodetalle.service';
import {ITareodetalle} from '../../../core/interfaces/tareo.interface';
import {SelectionModel} from '@angular/cdk/collections';
import {fuseAnimations} from '../../../../@fuse/animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith, takeUntil } from 'rxjs/operators';

/**
 * @title Basic use of `<table mat-table>`
 */


@Component({
    selector: 'app-tareodetalle',
    templateUrl: './tareodetalle.component.html',
    animations: fuseAnimations
})

export class TareodetalleComponent implements OnInit {
    _tareoDetalle: Array<ITareodetalle>;
    

    get tareoDetalle(): Array<ITareodetalle> {
        return this._tareoDetalle;
    }

    @Input() set tareoDetalle(data: Array<ITareodetalle>) {
        this._tareoDetalle = data;
        
        this.dataSource.data = this.tareoDetalle;
        if (this.tareoDetalle) {
            this.dataSource.paginator = this.paginatordet;
        }
    }

    @Input() detail: any;

    @Input() idMaster: number;
    @Input() codempMaster: string;
    @Input() nombreMaster: string;
    
    @Output() updated: EventEmitter<any> = new EventEmitter();
    displayedColumns: string[] = ['select', 'codemp', 'nombre', 'fechaini', 'hrentrada',
    'hrinidesc', 'hrfindesc', 'hrsalida', 'options'];
 
    @ViewChild(MatPaginator) paginatordet: MatPaginator;

    tareo: Array<ITareodetalle>;
    dataSource = new MatTableDataSource<ITareodetalle>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;

    /** checkbox datatable */
    selection = new SelectionModel<ITareodetalle>(true, []);

    constructor(
        private tareoService: TareodetalleService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.dataSource.data = this.tareoDetalle;
       
    }

    getTareos(): void {
        this.tareoService.getTareodetalles()
            .pipe(map(tareo => {
                tareo = tareo.map(c => {
                    return c;
                });
                return tareo;
            }))
            .subscribe(response => {
                this.tareo = response;
                console.log('this.tareo' , this.tareo);
                this.dataSource.data = this.tareo;
                this.dataSource.paginator = this.paginatordet;
                this.paginatordet._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

    delete(id: number): void {
        this.selectedId = id;
        this.deleteTareo();
    }

    deleteTareo(): void {
        this.tareoService.deleteTareo(this.selectedId)
            .subscribe(response => {
                this.updated.emit(true);
            });
    }

    public editRecord(id: number): void {
        this.selectedId = id;
        this.edit = true;
        console.log('editRecord', this.selectedId);
    }

    public addRecord(): void {
        
        this.edit = true;
        this.selectedId = null;
    }

    showDataTable(): void {
        this.edit = false;
    }

    updateDataTable(data: ITareodetalle): void {
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
            await this.tareoService.deleteTareo(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELIMINADOS TODOS');
                this.updated.emit(true);
            }
        }
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    
    setFileSelected(event): void {
        if (event != null) {
            this.tareoService.uploadFile(this.idMaster, event)
                .subscribe(response => {
                    console.log(response);
                });
        }
    }
  
}

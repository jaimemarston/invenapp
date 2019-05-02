import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { IMaterial } from '../../../core/interfaces/material.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { MaterialService } from '../../../core/services/material.service';
import { Router } from '@angular/router';
import { fuseAnimations } from '../../../../@fuse/animations';

@Component({
    selector: 'app-materiales-list',
    templateUrl: './materiales-list.component.html',
    styleUrls: ['./materiales-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class MaterialesListComponent implements OnInit {

    displayedColumns: string[] = ['select', 'codigo', 'descripcion', 'color', 'unimed', 'options'];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    materiales: Array<IMaterial>;
    dataSource = new MatTableDataSource<IMaterial>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;


    /** checkbox datatable */
    selection = new SelectionModel<IMaterial>(true, []);

    constructor(
        private materialService: MaterialService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.getMateriales();
    }

    getMateriales(): void {
        this.materialService.getMateriales()
            .subscribe(response => {
                this.materiales = response;
                this.dataSource.data = this.materiales;
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

    delete(id: number): void {
        this.selectedId = id;

        this.deleteClient();

    }

    deleteClient(): void {
        this.materialService.deleteMaterial(this.selectedId)
            .subscribe(response => {
                /* console.log(response); */
                this.getMateriales();
            });
    }

    public editRecord(id: number): void {
        this.selectedId = id;
        this.router.navigate([`materiales/edit/${id}`]);
    }

    public addRecord(): void {
        this.edit = true;
        this.selectedId = null;
    }

    showDataTable(): void {
        this.edit = false;
    }

    updateDataTable(data: IMaterial): void {
        this.getMateriales();
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


    printing(): void {
        // window.print();

        const prtContent = document.getElementById('div_print');
       
        console.log('Datos de printing');
        console.log(document);

        const getTbody = () => {
            
            const tbody = this.materiales.map(c => `<tr><td>${c.codigo}</td><td>${c.descripcion}</td></tr>`).join('');
            return tbody;
        };
        prtContent.innerHTML = `
                         <h1>Relacion de Materiales</h1>  
                         <table border="1">
                          <thead><th>ruc</th><th>Nombre</th></thead>
                          <tbody> ${getTbody()} </tbody>
                        </table>
                        <tfoot><button  onclick='window.print();'>Imprimir</button><button (click)="mostrar=false">Descargar PDF</button></tfoot>`;
        const WinPrint = window.open();
        WinPrint.document.write(prtContent.innerHTML);
   }

    /**
     * async await sirve para esperar que una promesa sea cumplida
     * */
    async deleteAllSelecteds(): Promise<void> {
        const selecteds = this.selection.selected;
        for (let index = 0; index < selecteds.length; index++) {
            await this.materialService.deleteMaterial(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELMINADOS TODOS');
                this.getMateriales();
            }
        }
    }
    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    addMaterial(): void {
        this.router.navigate(['materiales/add']);
    }
}

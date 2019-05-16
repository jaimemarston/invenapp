import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { IArticulo } from '../../../core/interfaces/articulo.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { ArticuloService } from '../../../core/services/articulo.service';
import { Router } from '@angular/router';
import { fuseAnimations } from '../../../../@fuse/animations';
import {CommonService} from '../../../core/services/common.service';

@Component({
    selector: 'app-articulos-list',
    templateUrl: './articulos-list.component.html',
    styleUrls: ['./articulos-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ArticulosListComponent implements OnInit {

    displayedColumns: string[] = ['select', 'codigo', 'descripcion', 'modelo', 'talla', 'options'];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    articulos: Array<IArticulo>;
    dataSource = new MatTableDataSource<IArticulo>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;


    /** checkbox datatable */
    selection = new SelectionModel<IArticulo>(true, []);

    constructor(
        private articuloService: ArticuloService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.getArticulos();
    }

    getArticulos(): void {
        this.articuloService.getArticulos()
            .subscribe(response => {
                this.articulos = response;
                this.dataSource.data = this.articulos;
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

    delete(id: number): void {
        this.selectedId = id;

        this.deleteClient();

    }

    deleteClient(): void {
        this.articuloService.deleteArticulo(this.selectedId)
            .subscribe(response => {
                /* console.log(response); */
                this.getArticulos();
            });
    }

    public editRecord(id: number): void {
        this.selectedId = id;
        this.router.navigate([`articulos/edit/${id}`]);
    }

    public addRecord(): void {
        this.edit = true;
        this.selectedId = null;
    }

    showDataTable(): void {
        this.edit = false;
    }

    updateDataTable(data: IArticulo): void {
        this.getArticulos();
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
       

        const prtContent = document.getElementById('div_print');

        const getTbody = () => {

            const tbody = this.articulos.map(c => `<tr><td>${c.codigo}</td><td>${c.descripcion}</td>
            <td>${c.descolor}</td><td>${c.tipo}</td><td>${c.talla}</td><td>${c.unimed}</td><td>${c.precioventa}</td></tr>`).join('');
            return tbody;
        };
        prtContent.innerHTML = `
                         <h1>Relacion de Materiales</h1>  
                         <table border="1">
                          <thead><th>CODIGO</th><th>NOMBRE</th><th>COLOR</th><th>TIPO</th><th>TALLA</th><th>UM</th><th>precioventa</th></thead>
                          <tbody> ${getTbody()} </tbody>
                        </table>
                        <tfoot></tfoot>`;
        CommonService.printElement(prtContent);
    }


    /**
     * async await sirve para esperar que una promesa sea cumplida
     * */
    async deleteAllSelecteds(): Promise<void> {
        const selecteds = this.selection.selected;
        for (let index = 0; index < selecteds.length; index++) {
            await this.articuloService.deleteArticulo(selecteds[index].id).toPromise();
            if (index === selecteds.length - 1) {
                this.snackBar.open('ELMINADOS TODOS');
                this.getArticulos();
            }
        }
    }
    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    addArticulo(): void {
        this.router.navigate(['articulos/add']);
    }
}

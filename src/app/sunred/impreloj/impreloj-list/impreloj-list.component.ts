import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { IImpreloj } from '../../../core/interfaces/impreloj.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { ImprelojService } from '../../../core/services/impreloj.service';
import { Router } from '@angular/router';
import { fuseAnimations } from '../../../../@fuse/animations';
import { CommonService} from '../../../core/services/common.service';

@Component({
    selector: 'app-impreloj-list',
    templateUrl: './impreloj-list.component.html',
    styleUrls: ['./impreloj-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ImprelojListComponent implements OnInit {

    displayedColumns: string[] = ['select', 'codemp', 'nombre', 'fechaini', 'hrentrada',
    'hrinidesc', 'hrfindesc', 'hrsalida'];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    impreloj: Array<IImpreloj>;
    dataSource = new MatTableDataSource<IImpreloj>();
    errorMessage: String;
    selectedId: number;
    edit: boolean;


    /** checkbox datatable */
    selection = new SelectionModel<IImpreloj>(true, []);

    constructor(
        private imprelojService: ImprelojService,
        private router: Router,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.getlista();
    }

    getlista(): void {
        this.imprelojService.getlista()
            .subscribe(response => {
                this.impreloj = response;
                this.dataSource.data = this.impreloj;
                this.dataSource.paginator = this.paginator;
                this.paginator._intl.itemsPerPageLabel = 'Item por Pagina:';
            });
    }

  
    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    setFileSelected(event): void {
        console.log(event);
        if (event != null) {
            this.imprelojService.uploadFile(event)
                .subscribe(response => {
                    console.log(response);
                });
        }
    }
}

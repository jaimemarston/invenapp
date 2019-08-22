import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { BASEURL } from '../../../../environments/environment';
import {ExcelService} from '../../../core/services/excel.service';
import { MatDialog } from '@angular/material';
import { UploadFileComponent } from './upload-file/upload-file.component';

@Component({
    selector: 'toolbar-table',
    templateUrl: './toolbar-table.component.html',
    styleUrls: ['./toolbar-table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ToolbarTableComponent implements OnInit {
    
    @Input() search = true;
    @Input() urlPrint;
    @Input() urlExcel;
    @Input() title: string;

    @Output() add: EventEmitter<any> = new EventEmitter();
    @Output() printing: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() settings: EventEmitter<any> = new EventEmitter();

    @Output() inputText: EventEmitter<string> = new EventEmitter<string>();
    @Output() fileSelected: EventEmitter<any> = new EventEmitter();
 
    constructor(
        public dialog: MatDialog ,
        private excelService: ExcelService) {
    }

    ngOnInit(): void {
    }


    // imprime el urlPrint del html
    print_pdf(): void {
        if (this.urlPrint) {
            console.log('print_pdf', `${BASEURL}${this.urlPrint}`);
            window.open(`${BASEURL}${this.urlPrint}`, '_blank');
            
            // window.location.replace(`${BASEURL}${this.urlPrint}`);
        }
    }
    
    print_xls(): void {
            
            console.log('print_xls', this.urlExcel);
            this.excelService.exportAsExcelFile(this.urlExcel, 'Movimientos');
            // https://medium.com/@madhavmahesh/exporting-an-excel-file-in-angular-927756ac9857
            // window.location.replace(`${BASEURL}${this.urlPrint}`);
    }

    uploadFile(): void {
        const dialogRef = this.dialog.open(UploadFileComponent, {
            data: {}
          });
      
          dialogRef.afterClosed().pipe(data => data).subscribe(data => {
              if (data) {
                  console.log(data);
                  this.fileSelected.emit(data);
              }
          });
    }
 }


import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    console.log('json', json);
    const jsons = JSON.stringify(json, ['codigo', 'codpro', 'descripcion', 'unimed', 'talla', 'tipo', 'genero', 'precio', 'cantidad', 'imptotal'] );
    const jsonp = JSON.parse(jsons, (key, value) => {
    // console.log('key', key)    
    if ( key === 'precio' || key === 'cantidad' || key === 'imptotal' ) {
          return Number(value);
          }
    return value;
    });
    console.log('jsonp', jsonp);

    // const json1: any =  JSON.parse(jsonp);

    // console.log('json1', json1);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonp);
    
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
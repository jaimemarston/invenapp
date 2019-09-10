import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { EmpleadosmaestroComponent } from './empleadosmaestro/empleadosmaestro.component';
import { fuseAnimations } from '../../../@fuse/animations';
import { IEmpleadosdetalle } from '../../core/interfaces/empleados.interface';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-empctacte',
    templateUrl: './empctacte.component.html',
    styleUrls: ['./empctacte.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EmpleadosComponent implements OnInit {
    detail: Array<IEmpleadosdetalle>;
    idMaster: number;
    codempMaster: string;
    nombreMaster: string;
    @ViewChild(EmpleadosmaestroComponent) empleadosMaestro: EmpleadosmaestroComponent;

    constructor() {
    }

    ngOnInit(): void {
    }

    setDetail(detail: Array<IEmpleadosdetalle>): any {
        
        this.detail = detail;
        this.idMaster = this.empleadosMaestro.selectedId;
        
       
    }

    getEmpleados(): void {
        
        this.empleadosMaestro.getEmpleado();
    }
}

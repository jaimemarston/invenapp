import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProduccionmaestroComponent } from './produccionmaestro/produccionmaestro.component';
import { fuseAnimations } from '../../../@fuse/animations';
import { IProducciondetalle } from '../../core/interfaces/produccion.interface';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-produccion',
    templateUrl: './produccion.component.html',
    styleUrls: ['./produccion.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProduccionComponent implements OnInit {
    detail: Array<IProducciondetalle>;
    idMaster: number;
    codempMaster: string;
    nombreMaster: string;
    @ViewChild(ProduccionmaestroComponent) produccionMaestro: ProduccionmaestroComponent;

    constructor() {
    }

    ngOnInit(): void {
    }

    setDetail(detail: Array<IProducciondetalle>): any {
        
        this.detail = detail;
        this.idMaster = this.produccionMaestro.selectedId;
        
       
    }

    getProduccion(): void {
        
        this.produccionMaestro.getProduccion();
    }
}

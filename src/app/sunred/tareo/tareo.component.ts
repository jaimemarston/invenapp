import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TareomaestroComponent } from './tareomaestro/tareomaestro.component';
import { fuseAnimations } from '../../../@fuse/animations';
import { ITareodetalle } from '../../core/interfaces/tareo.interface';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-tareo',
    templateUrl: './tareo.component.html',
    styleUrls: ['./tareo.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TareoComponent implements OnInit {
    detail: Array<ITareodetalle>;
    idMaster: number;
    codempMaster: string;
    nombreMaster: string;
    @ViewChild(TareomaestroComponent) tareoMaestro: TareomaestroComponent;

    constructor() {
    }

    ngOnInit(): void {
    }

    setDetail(detail: Array<ITareodetalle>): any {
        
        this.detail = detail;
        this.idMaster = this.tareoMaestro.selectedId;
        
       
    }

    getTareos(): void {
        
        this.tareoMaestro.getTareo();
    }
}

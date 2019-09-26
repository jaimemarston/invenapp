import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { RecetasmaestroComponent } from './recetasmaestro/recetasmaestro.component';
import { fuseAnimations } from '../../../@fuse/animations';
import { IRecetasdetalle } from '../../core/interfaces/recetas.interface';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-recetas',
    templateUrl: './recetas.component.html',
    styleUrls: ['./recetas.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RecetasComponent implements OnInit {
    detail: Array<IRecetasdetalle>;
    idMaster: number;
    codempMaster: string;
    nombreMaster: string;
    @ViewChild(RecetasmaestroComponent) recetasMaestro: RecetasmaestroComponent;

    constructor() {
    }

    ngOnInit(): void {
    }

    setDetail(detail: Array<IRecetasdetalle>): any {
        
        this.detail = detail;
        this.idMaster = this.recetasMaestro.selectedId;
        
       
    }

    getRecetas(): void {
        
        this.recetasMaestro.getReceta();
    }
}

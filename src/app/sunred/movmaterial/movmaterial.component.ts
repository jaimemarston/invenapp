import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MovmaterialmaestroComponent } from './movmaterialmaestro/movmaterialmaestro.component';
import { fuseAnimations } from '../../../@fuse/animations';
import { IMovmaterialdetalle } from '../../core/interfaces/movmaterial.interface';


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-movmaterial',
    templateUrl: './movmaterial.component.html',
    styleUrls: ['./movmaterial.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class MovmaterialComponent implements OnInit {
    detail: Array<IMovmaterialdetalle>;
    idMaster: number;
    @ViewChild(MovmaterialmaestroComponent) movmaterialMaestro: MovmaterialmaestroComponent;

    constructor() {
    }

    ngOnInit(): void {
    }

    setDetail(detail: Array<IMovmaterialdetalle>): any {
        this.detail = detail;
        this.idMaster = this.movmaterialMaestro.selectedId;
    }

    getMovmateriales(): void {
        this.movmaterialMaestro.getMovmaterial();
    }
}

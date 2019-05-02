import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../@fuse/animations';

@Component({
    selector: 'app-materiales',
    templateUrl: './materiales.component.html',
    styleUrls: ['./materiales.component.scss'],
    animations: fuseAnimations
})
export class MaterialesComponent implements OnInit {
    constructor() {
    }

    ngOnInit(): void {

    }


}
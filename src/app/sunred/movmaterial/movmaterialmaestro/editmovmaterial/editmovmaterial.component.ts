import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSelectModule, MatFormFieldModule, MatListModule } from '@angular/material';
import {IMovmaterial} from '../../../../core/interfaces/movmaterial.interface';
import {MovmaterialService} from '../../../../core/services/movmaterial.service';

export interface Estados {
    codigo: number;
    descripcion: string;
}

export interface Opcmoneda {
    codigo: string;
    descripcion: string;
}


@Component({
    selector: 'app-editmovmaterial',
    templateUrl: './editmovmaterial.component.html',
    styleUrls: ['./../../../../app.component.scss']
})

export class EditMovmaterialComponent implements OnInit {
    private _id: number;
    get id(): number {
        return this._id;
    }

    selectedest: 0;

    selectedmoneda = 'SOLES';
    selectedestado = 'Agendado';
    
    opcmoneda: Opcmoneda[] = [
        { codigo: 'SOLES', descripcion: 'SOLES' },
        { codigo: 'DOLARES', descripcion: 'DOLARES' },
    ];


    estados: Estados[] = [
        {codigo: 1, descripcion: 'Inventario Inicial'},
        {codigo: 2, descripcion: 'Ingreso Producto'},
        {codigo: 3, descripcion: 'Salida Producto'},
        {codigo: 4, descripcion: 'Anulado'},
    ];

    @Input() set id(id: number) {
        this._id = id;
        /* console.log(this.id); */
        if (id) {
            this.getMovmaterial();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
            }
        }
    }

    movmaterial: IMovmaterial;

    registerForm: FormGroup;

    @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() update: EventEmitter<IMovmaterial> = new EventEmitter<IMovmaterial>();

    constructor(private movmaterialService: MovmaterialService,
                private formBuilder: FormBuilder,
                public snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.registerForm = this.formBuilder.group({
            codigo: ['', Validators.compose([
                Validators.required
            ])],
            fechadoc: [''],
            desruc: [''],
            ruc: [''],
            telruc: [''],
            correoruc: [''],
            desmonepago: [''],
            estado: [0],
        });
    }

    getMovmaterial(): void {
        this.movmaterialService.getMovmaterial(this.id)
            .subscribe(response => {
                this.movmaterial = response;
                this.setForm();
            });
    }

    setForm(): void {

        this.registerForm.get('codigo').setValue(this.movmaterial.codigo);
        this.registerForm.get('fechadoc').setValue(this.movmaterial.fechadoc);
        this.registerForm.get('ruc').setValue(this.movmaterial.ruc);
        this.registerForm.get('desruc').setValue(this.movmaterial.desruc);
        this.registerForm.get('telruc').setValue(this.movmaterial.telruc);
        this.registerForm.get('correoruc').setValue(this.movmaterial.correoruc);
        this.registerForm.get('desmonepago').setValue(this.movmaterial.desmonepago);
        this.registerForm.get('estado').setValue(this.movmaterial.estado);
    }

    onBack(): void {
        this.back.emit(true);
    }

    saveForm(clear?: boolean): void {
        if (this.registerForm.valid) {
            this.saveMovmaterial();
            if (clear) {
                this.registerForm.reset();
            }
        } else {
            alert('FORMUARLIO INVALIDO');
        }
    }

    updateMovmaterial(): void {
        const data: IMovmaterial = this.registerForm.getRawValue();
        this.movmaterialService.updateMovmaterial(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                console.log('graba Maestro');
                console.log(data);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    addMovmaterial(): void {
        const data: IMovmaterial = this.registerForm.getRawValue();
        this.movmaterialService.addMovmaterial(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    saveMovmaterial(): void {
        this.id ? this.updateMovmaterial() : this.addMovmaterial();
    }
}

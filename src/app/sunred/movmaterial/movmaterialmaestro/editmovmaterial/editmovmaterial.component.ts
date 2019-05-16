import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSelectModule, MatFormFieldModule, MatListModule } from '@angular/material';
import {IMovmaterial} from '../../../../core/interfaces/movmaterial.interface';
import {MovmaterialService} from '../../../../core/services/movmaterial.service';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ProveedorService } from '../../../../core/services/proveedor.service';
import { IProveedores } from '../../../../core/interfaces/proveedores.interface';

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
    filteredProveedores: Observable<Array<IProveedores>>;
    proveedores: Array<IProveedores>;
    registerForm: FormGroup;

    @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() update: EventEmitter<IMovmaterial> = new EventEmitter<IMovmaterial>();

    constructor(private movmaterialService: MovmaterialService,
                private formBuilder: FormBuilder,
                private proveedoresService: ProveedorService,
                public snackBar: MatSnackBar) {
    }

    getProveedor(): void {
        this.proveedoresService.getProveedores()
            .subscribe(response => {
                this.proveedores = response;
            });
    }
    
    ngOnInit(): void {
        this.createForm();
        this.getProveedor();
    }
    
    private _filter(value: string): IProveedores[] {
        if (value && this.proveedores) {
            const filterValue = value.toLowerCase();
            return this.proveedores.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
        }
        return [];
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
            imppagado: [''],
            estado: [0],
        });
        const desrucForm = this.registerForm.get('desruc');

        this.filteredProveedores = desrucForm.valueChanges.pipe(
            map(value => this._filter(value))
        );
    }

    getcodigo(a): void {
        console.log(a);
        this.registerForm.get('ruc').setValue(a.ruc);
        this.registerForm.get('desruc').setValue(a.nombre);
        this.registerForm.get('telruc').setValue(a.telefono1);
        this.registerForm.get('correoruc').setValue(a.correo);
         
        
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
        this.registerForm.get('imppagado').setValue(this.movmaterial.imppagado);
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProduccionService } from '../../../../core/services/produccion.service';
import { IProduccion } from '../../../../core/interfaces/produccion.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSelectModule, MatFormFieldModule, MatListModule } from '@angular/material';
import { ProveedorService } from '../../../../core/services/proveedor.service';
import { IProveedores } from '../../../../core/interfaces/proveedores.interface';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

export interface Estados {
    codigo: number;
    descripcion: string;
}

export interface Opcmoneda {
    codigo: string;
    descripcion: string;
}


@Component({
    selector: 'app-editproduccion',
    templateUrl: './editproduccion.component.html',
    styleUrls: ['./../../../../app.component.scss']
})

export class EditProduccionComponent implements OnInit {
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
            this.getOne();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
            }
        }
    }

    produccion: IProduccion;
    filteredProveedores: Observable<Array<IProveedores>>;
    proveedores: Array<IProveedores>;
    registerForm: FormGroup;

    @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() update: EventEmitter<IProduccion> = new EventEmitter<IProduccion>();

    constructor(private empleadoService: ProduccionService,
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
            nombre: [null, Validators.compose([
                Validators.required,
                Validators.minLength(1),
            ])],
            codigo: ['', Validators.compose([
                Validators.required
            ])],
            cantidad: [null],

        });
        
        // const desrucForm = this.registerForm.get('desruc');

        // this.filteredProveedores = desrucForm.valueChanges.pipe(
        //     map(value => this._filter(value))
        // );
    }


    getcodigo(a): void {
        console.log(a);
        this.registerForm.get('nombre').setValue(this.produccion.nombre);
        this.registerForm.get('cantidad').setValue(this.produccion.totcant);

    }

    getOne(): void {
        this.empleadoService.getOne(this.id)
            .subscribe(response => {
                this.produccion = response;
                this.setForm();
            });
    }

    
    setForm(): void {

        this.registerForm.get('codigo').setValue(this.produccion.codigo);
        this.registerForm.get('nombre').setValue(this.produccion.nombre);
        this.registerForm.get('cantidad').setValue(this.produccion.totcant);

      
    }

    onBack(): void {
        this.back.emit(true);
    }

    saveForm(clear?: boolean): void {
        if (this.registerForm.valid) {
            this.saveProduccion();
            if (clear) {
                this.registerForm.reset();
            }
        } else {
            alert('FORMUARLIO INVALIDO');
        }
    }

    updateProduccion(): void {
        const data: IProduccion = this.registerForm.getRawValue();
        this.empleadoService.updateProduccion(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                console.log('graba Maestro');
                console.log(data);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    addProduccion(): void {
        const data: IProduccion = this.registerForm.getRawValue();
        this.empleadoService.addProduccion(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    saveProduccion(): void {
        this.id ? this.updateProduccion() : this.addProduccion();
    }
}

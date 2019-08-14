import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmpleadoService } from '../../../../core/services/empleado.service';
import { IEmpleados } from '../../../../core/interfaces/empleados.interface';
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
    selector: 'app-editempleados',
    templateUrl: './editempleados.component.html',
    styleUrls: ['./../../../../app.component.scss']
})

export class EditEmpleadosComponent implements OnInit {
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
            this.getEmpleados();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
            }
        }
    }

    empleados: IEmpleados;
    filteredProveedores: Observable<Array<IProveedores>>;
    proveedores: Array<IProveedores>;
    registerForm: FormGroup;

    @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() update: EventEmitter<IEmpleados> = new EventEmitter<IEmpleados>();

    constructor(private empleadoService: EmpleadoService,
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
            telefono1: [null],
            direccion: [null],

        });
        
        // const desrucForm = this.registerForm.get('desruc');

        // this.filteredProveedores = desrucForm.valueChanges.pipe(
        //     map(value => this._filter(value))
        // );
    }


    getcodigo(a): void {
        console.log(a);
        this.registerForm.get('nombre').setValue(this.empleados.nombre);
        this.registerForm.get('telefono1').setValue(this.empleados.telefono1);
        this.registerForm.get('direccion').setValue(this.empleados.direccion);
    }

    getEmpleados(): void {
        this.empleadoService.getEmpleado(this.id)
            .subscribe(response => {
                this.empleados = response;
                this.setForm();
            });
    }

    
    setForm(): void {

        this.registerForm.get('codigo').setValue(this.empleados.codigo);
        this.registerForm.get('nombre').setValue(this.empleados.nombre);
        this.registerForm.get('direccion').setValue(this.empleados.direccion);
        this.registerForm.get('telefono1').setValue(this.empleados.telefono1);
      
    }

    onBack(): void {
        this.back.emit(true);
    }

    saveForm(clear?: boolean): void {
        if (this.registerForm.valid) {
            this.saveEmpleados();
            if (clear) {
                this.registerForm.reset();
            }
        } else {
            alert('FORMUARLIO INVALIDO');
        }
    }

    updateEmpleados(): void {
        const data: IEmpleados = this.registerForm.getRawValue();
        this.empleadoService.updateEmpleado(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                console.log('graba Maestro');
                console.log(data);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    addEmpleados(): void {
        const data: IEmpleados = this.registerForm.getRawValue();
        this.empleadoService.addEmpleado(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    saveEmpleados(): void {
        this.id ? this.updateEmpleados() : this.addEmpleados();
    }
}

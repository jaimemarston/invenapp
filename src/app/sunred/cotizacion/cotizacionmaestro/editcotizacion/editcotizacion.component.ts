import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CotizacionService } from '../../../../core/services/cotizacion.service';
import { ICotizacion } from '../../../../core/interfaces/cotizacion.interface';
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
    selector: 'app-editcotizacion',
    templateUrl: './editcotizacion.component.html',
    styleUrls: ['./../../../../app.component.scss']
})

export class EditCotizacionComponent implements OnInit {
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
            this.getCotizacion();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
            }
        }
    }

    cotizacion: ICotizacion;
    filteredProveedores: Observable<Array<IProveedores>>;
    proveedores: Array<IProveedores>;
    registerForm: FormGroup;

    @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() update: EventEmitter<ICotizacion> = new EventEmitter<ICotizacion>();

    constructor(private cotizacionService: CotizacionService,
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
            tc_dolares: [''],
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

    getCotizacion(): void {
        this.cotizacionService.getCotizacion(this.id)
            .subscribe(response => {
                this.cotizacion = response;
                this.setForm();
            });
    }

    
    setForm(): void {

        this.registerForm.get('codigo').setValue(this.cotizacion.codigo);
        this.registerForm.get('fechadoc').setValue(this.cotizacion.fechadoc);
        this.registerForm.get('ruc').setValue(this.cotizacion.ruc);
        this.registerForm.get('desruc').setValue(this.cotizacion.desruc);
        this.registerForm.get('telruc').setValue(this.cotizacion.telruc);
        this.registerForm.get('correoruc').setValue(this.cotizacion.correoruc);
        this.registerForm.get('desmonepago').setValue(this.cotizacion.desmonepago);
        this.registerForm.get('tc_dolares').setValue(this.cotizacion.tc_dolares);
        this.registerForm.get('estado').setValue(this.cotizacion.estado);
        this.registerForm.get('imppagado').setValue(this.cotizacion.imppagado);
        
    }

    onBack(): void {
        this.back.emit(true);
    }

    saveForm(clear?: boolean): void {
        if (this.registerForm.valid) {
            this.saveCotizacion();
            if (clear) {
                this.registerForm.reset();
            }
        } else {
            alert('FORMUARLIO INVALIDO');
        }
    }

    updateCotizacion(): void {
        const data: ICotizacion = this.registerForm.getRawValue();
        this.cotizacionService.updateCotizacion(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                console.log('graba Maestro');
                console.log(data);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    addCotizacion(): void {
        const data: ICotizacion = this.registerForm.getRawValue();
        this.cotizacionService.addCotizacion(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    saveCotizacion(): void {
        this.id ? this.updateCotizacion() : this.addCotizacion();
    }
}

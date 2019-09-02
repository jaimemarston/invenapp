import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TareoService } from '../../../../core/services/tareo.service';
import { ITareo } from '../../../../core/interfaces/tareo.interface';
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
    selector: 'app-edittareo',
    templateUrl: './edittareo.component.html',
    styleUrls: ['./../../../../app.component.scss']
})

export class EditTareoComponent implements OnInit {
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




    @Input() set id(id: number) {
        this._id = id;
        /* console.log(this.id); */
        if (id) {
            this.getTareo();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
            }
        }
    }

    tareo: ITareo;
    registerForm: FormGroup;

    @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() update: EventEmitter<ITareo> = new EventEmitter<ITareo>();

    constructor(private tareoService: TareoService,
                private formBuilder: FormBuilder,
                private proveedoresService: ProveedorService,
                public snackBar: MatSnackBar) {
    }


    ngOnInit(): void {
        this.createForm();
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
            nsemana: [null],
            fechaini: [null],
            fechafin: [null],

        });
        
        // const desrucForm = this.registerForm.get('desruc');

        // this.filteredProveedores = desrucForm.valueChanges.pipe(
        //     map(value => this._filter(value))
        // );
    }


    getcodigo(a): void {
        console.log(a);
        this.registerForm.get('nombre').setValue(this.tareo.nombre);
        this.registerForm.get('nsemana').setValue(this.tareo.nsemana);
        this.registerForm.get('fechaini').setValue(this.tareo.fechaini);
        this.registerForm.get('fechafin').setValue(this.tareo.fechafin);
        
    }

    getTareo(): void {
        this.tareoService.getTareounico(this.id)
            .subscribe(response => {
                this.tareo = response;
                this.setForm();
            });
    }

    
    setForm(): void {

        this.registerForm.get('codigo').setValue(this.tareo.codigo);
        this.registerForm.get('nombre').setValue(this.tareo.nombre);
        this.registerForm.get('fechaini').setValue(this.tareo.fechaini);
        this.registerForm.get('fechafin').setValue(this.tareo.fechafin);

    }

    onBack(): void {
        this.back.emit(true);
    }

    saveForm(clear?: boolean): void {
        if (this.registerForm.valid) {
            this.saveTareo();
            if (clear) {
                this.registerForm.reset();
            }
        } else {
            alert('FORMUARLIO INVALIDO');
        }
    }

    updateTareo(): void {
        const data: ITareo = this.registerForm.getRawValue();
        this.tareoService.updateTareo(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                console.log('graba Maestro');
                console.log(data);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    addTareo(): void {
        const data: ITareo = this.registerForm.getRawValue();
        this.tareoService.addTareo(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    saveTareo(): void {
        this.id ? this.updateTareo() : this.addTareo();
    }
}

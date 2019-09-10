import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { EmpctactedetalleService } from '../../../../core/services/empctactedetalle.service';
import { IEmpctactedetalle } from '../../../../core/interfaces/empleados.interface';
import { IArticulo } from '../../../../core/interfaces/articulo.interface';
import { IUnidad } from '../../../../core/interfaces/unidad.interface';
import { ArticuloService } from '../../../../core/services/articulo.service';
import { UnidadService } from '../../../../core/services/unidad.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { IProveedores } from 'app/core/interfaces/proveedores.interface';


export interface Opctipo {
    codigo: string;
    descripcion: string;
}

@Component({
    selector: 'app-editempctactedetalle',
    templateUrl: './editempctactedetalle.component.html',
    animations: fuseAnimations
})

export class EditempctactedetalleComponent implements OnInit, OnDestroy, OnChanges {
    $unsubscribe = new Subject();
    private _id: number;
    get id(): number {
        return this._id;
    }

    @Input() set id(id: number) {
        this._id = id;
       
        if (id) {
            this.getEmpctacte();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
                this.registerForm.get('codemp').setValue(this.codempMaster);
                this.registerForm.get('nombre').setValue(this.nombreMaster);
            }
        }
    }

    @Input() idMaster: number;
    @Input() codempMaster: string;
    @Input() nombreMaster: string;

    selectedmon = 'INGRESO';
    selectedopc = '0';
    filteredArticulos: Observable<Array<IArticulo>>;
    filteredUnidades: Observable<Array<IUnidad>>;

    opctipo: Opctipo[] = [
        { codigo: 'INGRESO', descripcion: 'INGRESO' },
        { codigo: 'DESCUENTO', descripcion: 'DESCUENTO' },
    ];

    empctacte: IEmpctactedetalle;
    articulos: Array<IArticulo>;
    unidades: Array<IUnidad>;


    registerForm: FormGroup;

    @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() update: EventEmitter<IEmpctactedetalle> = new EventEmitter<IEmpctactedetalle>();

    @ViewChild('inputCodigo') inputCodigo: ElementRef<HTMLInputElement>;

    constructor(private empctacteService: EmpctactedetalleService,
        private formBuilder: FormBuilder,
        private articuloService: ArticuloService,
        private unidadService: UnidadService,
        public snackBar: MatSnackBar) {
    }

    getArticulo(): void {
        this.articuloService.getArticulos()
            .subscribe(response => {
                this.articulos = response;
            });
    }


    getUnidad(): void {
        this.unidadService.getUnidades()
            .subscribe(response => {
                this.unidades = response;
            });
    }




    ngOnInit(): void {
        this.createForm();
        this.getArticulo();
        this.getUnidad();

    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('ngngOnChanges');
        if (changes.idMaster) {
            if (this.registerForm) {
                this.registerForm.get('codigo').setValue(this.idMaster);
                this.registerForm.get('codemp').setValue(this.codempMaster);
            }
        }

    }

    private _filter(value: string): IArticulo[] {
        if (value && this.articulos) {
            const filterValue = value.toLowerCase();
            return this.articulos.filter(option => option.descripcion.toLowerCase().indexOf(filterValue) === 0);

        }

        return [];
    }


    private _filter2(value: string): IUnidad[] {
        if (value && this.unidades) {
            const filterValue2 = value.toLowerCase();
            return this.unidades.filter(option => option.descripcion.toLowerCase().includes(filterValue2));
        }
        return [];
    }

    createForm(): void {
        
        this.registerForm = this.formBuilder.group({
            nombre: [this.nombreMaster],
            codemp: [this.codempMaster],
            codigo: [this.idMaster],
            cc: [null],
            descc: [null],
            fechaini: [null],
            fechafin: [null],
            turno: [null],
            importe: [null],
            codctacte: [null],
            desctacte: [null],
        });
       

        // const descripcionForm = this.registerForm.get('nombre');


        // this.filteredArticulos = descripcionForm.valueChanges.pipe(
        //     map(value => this._filter(value))
        // );

        // this.filteredUnidades = desunimedForm.valueChanges.pipe(
        //     map(value => this._filter2(value))
        // );

        // this.valueChanges();

    }

    // valueChanges(): void {
    //     const precioControl = this.registerForm.get('precio');
    //     const cantidadControl = this.registerForm.get('cantidad');


    //     precioControl.valueChanges
    //         .pipe(takeUntil(this.$unsubscribe))
    //         .subscribe(value => {
    //             this.setImporteTotal(precioControl.value, cantidadControl.value);
    //         });

    //     cantidadControl.valueChanges
    //         .pipe(takeUntil(this.$unsubscribe))
    //         .subscribe(value => {
    //             this.setImporteTotal(precioControl.value, cantidadControl.value);
    //         });
    // }

    // setImporteTotal(a, b): void {
    //     this.registerForm.get('imptotal').setValue((a * b).toFixed(2));
    // }

    // setdesunimed(a): void {
    //     this.registerForm.get('desunimed').setValue(a);
    // }


    getcodigo(a): void {
        
        // this.registerForm.get('codigo').setValue(a.codigo);
        // this.registerForm.get('nombre').setValue(this.empctacte.nombre);
        // this.registerForm.get('codemp').setValue(this.empctacte.codemp);
        this.registerForm.get('cc').setValue(this.empctacte.cc);
        this.registerForm.get('descc').setValue(this.empctacte.descc);
        this.registerForm.get('fechaini').setValue(this.empctacte.fechaini);
        this.registerForm.get('fechafin').setValue(this.empctacte.fechafin);
        this.registerForm.get('turno').setValue(this.empctacte.turno);
        this.registerForm.get('importe').setValue(this.empctacte.importe);
        this.registerForm.get('codctacte').setValue(this.empctacte.codctacte);
        this.registerForm.get('desctacte').setValue(this.empctacte.desctacte);
       

    }


    getEmpctacte(): void {

        this.empctacteService.getEmpctacte(this.id)
            .subscribe(response => {
                this.empctacte = response;
                this.setForm();
            });
    }

    setForm(): void {
        
        // this.registerForm.get('codigo').setValue(this.empctacte.codigo);
        // this.registerForm.get('nombre').setValue(this.empctacte.nombre);
        // this.registerForm.get('codemp').setValue(this.empctacte.codemp);
        this.registerForm.get('cc').setValue(this.empctacte.cc);
        this.registerForm.get('descc').setValue(this.empctacte.descc);
        this.registerForm.get('fechaini').setValue(this.empctacte.fechaini);
        this.registerForm.get('fechafin').setValue(this.empctacte.fechafin);
        this.registerForm.get('turno').setValue(this.empctacte.turno);
        this.registerForm.get('importe').setValue(this.empctacte.importe);
        this.registerForm.get('codctacte').setValue(this.empctacte.codctacte);
        this.registerForm.get('desctacte').setValue(this.empctacte.desctacte);
    }

    onBack(): void {
        this.back.emit(true);
    }

    saveForm(clear?: boolean): void {

        if (this.registerForm.valid) {
            this.saveEmpleados();
            if (clear) {
                this.registerForm.reset();
                this.inputCodigo.nativeElement.focus();
            }
        } else {
            alert('FORMUARLIO INVALIDO');
        }
    }

    prepareData(): any {
        /** rest spread, paso de parametros REST, este método sirve para clonar objetos. destructuración de datos
         * http://www.etnassoft.com/2016/07/04/desestructuracion-en-javascript-parte-1/ */
        console.log('prepareData', this.nombreMaster);
        this.registerForm.get('codigo').setValue(this.idMaster);
        this.registerForm.get('codemp').setValue(this.codempMaster);
        this.registerForm.get('nombre').setValue(this.nombreMaster);
        const data: IEmpctactedetalle = { ...this.registerForm.getRawValue() };
        data.master = this.idMaster;
        data.codemp = this.codempMaster;
        data.nombre = this.nombreMaster;
        return data;
    }

    updateEmpleados(): void {
        const data = this.prepareData();

        this.empctacteService.updateEmpctacte(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    addEmpleados(): void {
        const data = this.prepareData();
        console.log('addEmpleados' + this.idMaster);
        this.empctacteService.addEmpctacte(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    saveEmpleados(): void {
        this.id ? this.updateEmpleados() : this.addEmpleados();
    }

    ngOnDestroy(): void {
        this.$unsubscribe.next();
        this.$unsubscribe.complete();
    }


}

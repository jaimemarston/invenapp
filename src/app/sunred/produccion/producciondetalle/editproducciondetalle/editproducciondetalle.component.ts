import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ProducciondetalleService } from '../../../../core/services/producciondetalle.service';
import { IProducciondetalle } from '../../../../core/interfaces/produccion.interface';
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


export interface Opcviaje {
    codigo: string;
    descripcion: string;
}

@Component({
    selector: 'app-editproducciondetalle',
    templateUrl: './editproducciondetalle.component.html',
    animations: fuseAnimations
})

export class EditproducciondetalleComponent implements OnInit, OnDestroy, OnChanges {
    $unsubscribe = new Subject();
    private _id: number;
    get id(): number {
        return this._id;
    }

    @Input() set id(id: number) {
        this._id = id;
       
        if (id) {
            this.getOne();
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

    
    selectedopc = '0';
    filteredArticulos: Observable<Array<IArticulo>>;
    filteredUnidades: Observable<Array<IUnidad>>;

    opcviaje: Opcviaje[] = [
        { codigo: 'Solo ida', descripcion: 'Solo ida' },
        { codigo: 'Ida y vuelta', descripcion: 'Ida y vuelta' },
        { codigo: 'Full Day', descripcion: 'Full Day' },
    ];

    produccion: IProducciondetalle;
    articulos: Array<IArticulo>;
    unidades: Array<IUnidad>;


    registerForm: FormGroup;

    @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() update: EventEmitter<IProducciondetalle> = new EventEmitter<IProducciondetalle>();

    @ViewChild('inputCodigo') inputCodigo: ElementRef<HTMLInputElement>;

    constructor(private produccionService: ProducciondetalleService,
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
            cantidad: [null],

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
        // this.registerForm.get('nombre').setValue(this.produccion.nombre);
        // this.registerForm.get('codemp').setValue(this.produccion.codemp);
        this.registerForm.get('cc').setValue(this.produccion.cc);
        this.registerForm.get('descc').setValue(this.produccion.descc);
        this.registerForm.get('cantidad').setValue(this.produccion.cantidad);

    }


    getOne(): void {

        this.produccionService.getOne(this.id)
            .subscribe(response => {
                this.produccion = response;
                this.setForm();
            });
    }

    setForm(): void {
        
        // this.registerForm.get('codigo').setValue(this.produccion.codigo);
        // this.registerForm.get('nombre').setValue(this.produccion.nombre);
        // this.registerForm.get('codemp').setValue(this.produccion.codemp);
        this.registerForm.get('cc').setValue(this.produccion.cc);
        this.registerForm.get('descc').setValue(this.produccion.descc);
        this.registerForm.get('cantidad').setValue(this.produccion.cantidad);
    }

    onBack(): void {
        this.back.emit(true);
    }

    saveForm(clear?: boolean): void {

        if (this.registerForm.valid) {
            this.saveProduccion();
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
        const data: IProducciondetalle = { ...this.registerForm.getRawValue() };
        data.master = this.idMaster;
        data.codemp = this.codempMaster;
        data.nombre = this.nombreMaster;
        return data;
    }

    updateProduccion(): void {
        const data = this.prepareData();

        this.produccionService.updateProduccion(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    addProduccion(): void {
        const data = this.prepareData();
        console.log('addProduccion' + this.idMaster);
        this.produccionService.addProduccion(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    saveProduccion(): void {
        this.id ? this.updateProduccion() : this.addProduccion();
    }

    ngOnDestroy(): void {
        this.$unsubscribe.next();
        this.$unsubscribe.complete();
    }


}

import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TareodetalleService } from '../../../../core/services/tareodetalle.service';
import { ITareodetalle } from '../../../../core/interfaces/tareo.interface';
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




@Component({
    selector: 'app-edittareodetalle',
    templateUrl: './edittareodetalle.component.html',
    animations: fuseAnimations
})

export class EdittareodetalleComponent implements OnInit, OnDestroy, OnChanges {
    $unsubscribe = new Subject();
    private _id: number;
    get id(): number {
        return this._id;
    }

    @Input() set id(id: number) {
        this._id = id;
       
        if (id) {
            this.getTareo();
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



    tareo: ITareodetalle;
    articulos: Array<IArticulo>;
    unidades: Array<IUnidad>;


    registerForm: FormGroup;

    @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() update: EventEmitter<ITareodetalle> = new EventEmitter<ITareodetalle>();

    @ViewChild('inputCodigo') inputCodigo: ElementRef<HTMLInputElement>;

    constructor(private tareodetalleService: TareodetalleService,
        private formBuilder: FormBuilder,
        private articuloService: ArticuloService,
        private unidadService: UnidadService,
        public snackBar: MatSnackBar) {
    }

    getTareodetalle(): void {
        this.tareodetalleService.getTareo()
            .subscribe(response => {
                this.tareo = response;
            });
    }


    ngOnInit(): void {
        this.createForm();
        this.getTareodetalle();
        

    }

    ngOnChanges(changes: SimpleChanges): void {
        
        if (changes.idMaster) {
            if (this.registerForm) {
                this.registerForm.get('codigo').setValue(this.idMaster);
                this.registerForm.get('codemp').setValue(this.codempMaster);
            }
        }

    }

    createForm(): void {
       
        this.registerForm = this.formBuilder.group({
            nombre: [this.nombreMaster],
            codemp: [this.codempMaster],
            codigo: [this.idMaster],
            fechaini: [null],
            hrentrada: [null],
            hrinidesc: [null],
            hrfindesc: [null],
            hrsalida: [null],
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
        // this.registerForm.get('nombre').setValue(this.tareo.nombre);
        // this.registerForm.get('codemp').setValue(this.tareo.codemp);
        this.registerForm.get('fechaini').setValue(this.tareo.fechaini);
        this.registerForm.get('hrentrada').setValue(this.tareo.hrentrada);
        this.registerForm.get('hrinidesc').setValue(this.tareo.hrinidesc);
        this.registerForm.get('hrfindesc').setValue(this.tareo.hrfindesc);
        this.registerForm.get('hrsalida').setValue(this.tareo.hrsalida);
        
    }


    getTareo(): void {

        this.tareodetalleService.getTareounico(this.id)
            .subscribe(response => {
                this.tareo = response;
                this.setForm();
            });
    }

    setForm(): void {
        
        // this.registerForm.get('codigo').setValue(this.tareo.codigo);
        this.registerForm.get('nombre').setValue(this.tareo.nombre);
        this.registerForm.get('codemp').setValue(this.tareo.codemp);
        
        this.registerForm.get('fechaini').setValue(this.tareo.fechaini);
        this.registerForm.get('hrentrada').setValue(this.tareo.hrentrada);
        this.registerForm.get('hrinidesc').setValue(this.tareo.hrinidesc);
        this.registerForm.get('hrfindesc').setValue(this.tareo.hrfindesc);
        this.registerForm.get('hrsalida').setValue(this.tareo.hrsalida);
    }

    onBack(): void {
        this.back.emit(true);
    }

    saveForm(clear?: boolean): void {

        if (this.registerForm.valid) {
            this.saveTareo();
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
        const data: ITareodetalle = { ...this.registerForm.getRawValue() };
        data.master = this.idMaster;
        data.codemp = this.codempMaster;
        data.nombre = this.nombreMaster;
        return data;
    }

    updateTareo(): void {
        const data = this.prepareData();

        this.tareodetalleService.updateTareo(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    addTareo(): void {
        const data = this.prepareData();
        console.log('addTareo' + this.idMaster);
        this.tareodetalleService.addTareo(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    saveTareo(): void {
        this.id ? this.updateTareo() : this.addTareo();
    }

    ngOnDestroy(): void {
        this.$unsubscribe.next();
        this.$unsubscribe.complete();
    }


}

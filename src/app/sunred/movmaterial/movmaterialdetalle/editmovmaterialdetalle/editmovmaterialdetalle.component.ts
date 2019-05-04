import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MovmaterialdetalleService } from '../../../../core/services/movmaterialdetalle.service';
import { IMovmaterialdetalle } from '../../../../core/interfaces/movmaterial.interface';
import { IArticulo } from '../../../../core/interfaces/articulo.interface';
import { IUnidad } from '../../../../core/interfaces/unidad.interface';
import { ArticuloService } from '../../../../core/services/articulo.service';
import { UnidadService } from '../../../../core/services/unidad.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '../../../../../@fuse/animations';


export interface Opcviaje {
    codigo: string;
    descripcion: string;
}

@Component({
    selector: 'app-editmovmaterialdetalle',
    templateUrl: './editmovmaterialdetalle.component.html',
    animations: fuseAnimations
})

export class EditmovmaterialdetalleComponent implements OnInit, OnDestroy, OnChanges {
    $unsubscribe = new Subject();
    private _id: number;
    get id(): number {
        return this._id;
    }

    @Input() set id(id: number) {
        this._id = id;

        if (id) {
            this.getMovmaterial();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
            }
        }
    }

    @Input() idMaster: number;
    
    
    selectedopc = '0';
    filteredArticulos: Observable<Array<IArticulo>>;
    filteredUnidades: Observable<Array<IUnidad>>;

    opcviaje: Opcviaje[] = [
        { codigo: 'Solo ida', descripcion: 'Solo ida' },
        { codigo: 'Ida y vuelta', descripcion: 'Ida y vuelta' },
        { codigo: 'Full Day', descripcion: 'Full Day' },
    ];

    movmaterial: IMovmaterialdetalle;
    articulos: Array<IArticulo>;
    unidades: Array<IUnidad>;


    registerForm: FormGroup;

    @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() update: EventEmitter<IMovmaterialdetalle> = new EventEmitter<IMovmaterialdetalle>();

    @ViewChild('inputCodigo') inputCodigo: ElementRef<HTMLInputElement>;

    constructor(private movmaterialService: MovmaterialdetalleService,
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
        if (changes.idMaster) {
            if (this.registerForm) {
                this.registerForm.get('codigo').setValue(this.idMaster);
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
            descripcion: ['', Validators.required],
            desunimed: [''],
            cantidad: [''],
            precio: [''],
            imptotal: [''],
            codigo: [this.idMaster],
        });

        const descripcionForm = this.registerForm.get('descripcion');
        const desunimedForm = this.registerForm.get('desunimed');

        this.filteredArticulos = descripcionForm.valueChanges.pipe(
            map(value => this._filter(value))
        );

        this.filteredUnidades = desunimedForm.valueChanges.pipe(
            map(value => this._filter2(value))
        );

        this.valueChanges();
        
    }

    valueChanges(): void {
        const precioControl = this.registerForm.get('precio');
        const cantidadControl = this.registerForm.get('cantidad');
        precioControl.valueChanges
            .pipe(takeUntil(this.$unsubscribe))
            .subscribe(value => {
                this.setImporteTotal(precioControl.value, cantidadControl.value);
            });

        cantidadControl.valueChanges
            .pipe(takeUntil(this.$unsubscribe))
            .subscribe(value => {
                this.setImporteTotal(precioControl.value, cantidadControl.value);
            });
    }

    setImporteTotal(a, b): void {
        /*this.registerForm.get('imptotal').setValue(a * b);*/
        this.registerForm.get('imptotal').setValue(a);
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
        this.registerForm.get('descripcion').setValue(this.movmaterial.descripcion);
        this.registerForm.get('desunimed').setValue(this.movmaterial.desunimed);
        this.registerForm.get('cantidad').setValue(this.movmaterial.cantidad);
        this.registerForm.get('precio').setValue(this.movmaterial.precio);
        this.registerForm.get('imptotal').setValue(this.movmaterial.imptotal);
    }

    onBack(): void {
        this.back.emit(true);
    }

    saveForm(clear?: boolean): void {
        if (this.registerForm.valid) {
            this.saveMovmaterial();
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
        this.registerForm.get('codigo').setValue(this.idMaster);
        const data: IMovmaterialdetalle = { ...this.registerForm.getRawValue() };
        data.master = this.idMaster;

        return data;
    }

    updateMovmaterial(): void {
        const data = this.prepareData();
        this.movmaterialService.updateMovmaterial(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    addMovmaterial(): void {
        const data = this.prepareData();

        this.movmaterialService.addMovmaterial(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
            });
    }

    saveMovmaterial(): void {
        this.id ? this.updateMovmaterial() : this.addMovmaterial();
    }

    ngOnDestroy(): void {
        this.$unsubscribe.next();
        this.$unsubscribe.complete();
    }

   
}
import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {IArticulo} from '../../../core/interfaces/articulo.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Ibancos} from '../../../core/interfaces/varios.interface';
import {ArticuloService} from '../../../core/services/articulo.service';
import {BancoService} from '../../../core/services/banco.service';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {fuseAnimations} from '../../../../@fuse/animations';

import to from 'await-to-js';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {CommonService} from '../../../core/services/common.service';

export interface Monedas {
    codigo: string;
    descripcion: string;
}

@Component({
    selector: 'app-impreloj-form',
    templateUrl: './impreloj-form.component.html',
    styleUrls: ['./impreloj-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ImprelojFormComponent implements OnInit, OnDestroy {

    /**
     * mascara para poner formatos en inputs.
     * https://github.com/JsDaddy/ngx-mask
     * */

    selectedmon = '0';
    /* moneda por defecto */
    selectedban = '';
    selectedban2 = '';

    private _id: number;
    get id(): number {
        return this._id;
    }

    @Input() set id(id: number) {
        this._id = id;
        if (id) {
            this.getClient();
        } else {
            if (this.registerForm) {
                this.registerForm.reset();
            }
        }
    }

    monedas: Monedas[] = [
        {codigo: 'Soles', descripcion: 'Soles'},
        {codigo: 'Dolares', descripcion: 'Dolares'},
    ];


    articulo: IArticulo;
    registerForm: FormGroup;
    bancos: Array<Ibancos>;

    unsubscribe = new Subject();

    @Output() update: EventEmitter<IArticulo> = new EventEmitter<IArticulo>();

    @ViewChildren('inputs') inputs: QueryList<ElementRef<HTMLInputElement>>;

    constructor(private articuloService: ArticuloService,
                private bancoService: BancoService,
                private formBuilder: FormBuilder,
                public snackBar: MatSnackBar,
                private router: Router,
                private route: ActivatedRoute,
                private commonService: CommonService) {
    }

    getBanco(): void {
        this.bancoService.getBancos()
            .subscribe(response => {
                this.bancos = response;
            });
    }

    ngOnInit(): void {
        this.createForm();
        this.getBanco();
        this.id = this.route.snapshot.params['id'];
    }

    createForm(): void {
        this.registerForm = this.formBuilder.group({
            codigo: [null, Validators.compose([
                Validators.required
            ])],
            descripcion: [null, Validators.compose([
                Validators.required,
                Validators.minLength(1),
            ])],
            descolor: [''],
            talla: [''],
            modelo: [''],
            genero: [''],
            desruc: [''],
            precioventa: [''],
            unimed: [''],
            tipo: [''],
            stockmin: [''],

        });
    }

    getClient(): void {
        this.articuloService.getArticulo(this.id)
            .subscribe(response => {
                this.articulo = response;
                this.setForm();
            });
    }

    setForm(): void {
        this.registerForm.get('codigo').setValue(this.articulo.codigo);
        this.registerForm.get('descripcion').setValue(this.articulo.descripcion);
        this.registerForm.get('descolor').setValue(this.articulo.descolor);
        this.registerForm.get('talla').setValue(this.articulo.talla);
        this.registerForm.get('modelo').setValue(this.articulo.modelo);
        this.registerForm.get('genero').setValue(this.articulo.genero);
        this.registerForm.get('desruc').setValue(this.articulo.desruc);
        this.registerForm.get('precioventa').setValue(this.articulo.precioventa);
        this.registerForm.get('unimed').setValue(this.articulo.unimed);
        this.registerForm.get('tipo').setValue(this.articulo.tipo);
        this.registerForm.get('stockmin').setValue(this.articulo.stockmin);
    }

    saveForm(clear?: boolean): void {
        if (this.registerForm.valid) {
            this.saveClient();
            if (clear) {
                this.registerForm.reset();
            }
        } else {
            alert('FORMUARLIO INVALIDO');
        }
    }

    updateArticulo(): void {
        const data: IArticulo = this.registerForm.getRawValue();

        this.articuloService.updateArticulo(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.back();
            });
    }

    async addArticulo(): Promise<void> {
        const data: IArticulo = this.registerForm.getRawValue();
        const [error, response] = await to(this.articuloService.addArticulo(data).toPromise());
        if (response) {
            this.update.emit(response);
            this.snackBar.open('Registro agregado satisfactoriamente...!');
            this.registerForm.reset();
            this.createForm();
            this.inputs.first.nativeElement.focus();
        } else {
            this.commonService.showFormError(error);
        }
    }

    saveClient(): void {
        this.id ? this.updateArticulo() : this.addArticulo();
    }

    back(): void {
        this.router.navigate(['articulos']);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}


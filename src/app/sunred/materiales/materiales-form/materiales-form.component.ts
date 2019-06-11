import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { IMaterial } from '../../../core/interfaces/material.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ibancos } from '../../../core/interfaces/varios.interface';
import { MaterialService } from '../../../core/services/material.service';
import { BancoService } from '../../../core/services/banco.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '../../../../@fuse/animations';

export interface Monedas {
    codigo: string;
    descripcion: string;
}

@Component({
    selector: 'app-materiales-form',
    templateUrl: './materiales-form.component.html',
    styleUrls: ['./materiales-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class MaterialesFormComponent implements OnInit {

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


    material: IMaterial;
    registerForm: FormGroup;
    bancos: Array<Ibancos>;

    @Output() update: EventEmitter<IMaterial> = new EventEmitter<IMaterial>();

    @ViewChildren('inputs') inputs: QueryList<ElementRef<HTMLInputElement>>;

    constructor(private materialService: MaterialService,
                private bancoService: BancoService,
                private formBuilder: FormBuilder,
                public snackBar: MatSnackBar,
                private router: Router,
                private route: ActivatedRoute) {
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
            desruc: [''],
            precioventa: [''],
            unimed: [''],
            desmonecompra: [''], 
            tipo: [''],
            stockmin: [''],
            
        });
    }

    getClient(): void {
        this.materialService.getMaterial(this.id)
            .subscribe(response => {
                this.material = response;
                this.setForm();
            });
    }

    setForm(): void {
        this.registerForm.get('codigo').setValue(this.material.codigo);
        this.registerForm.get('descripcion').setValue(this.material.descripcion);
        this.registerForm.get('descolor').setValue(this.material.descolor);
        this.registerForm.get('desruc').setValue(this.material.desruc);
        this.registerForm.get('precioventa').setValue(this.material.precioventa);
        this.registerForm.get('desmonecompra').setValue(this.material.desmonecompra);
        this.registerForm.get('unimed').setValue(this.material.unimed);
        this.registerForm.get('tipo').setValue(this.material.tipo);
        this.registerForm.get('stockmin').setValue(this.material.stockmin);
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

    updateMaterial(): void {
        const data: IMaterial = this.registerForm.getRawValue();

        this.materialService.updateMaterial(this.id, data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.back();
            });
    }

    addMaterial(): void {
        const data: IMaterial = this.registerForm.getRawValue();
        this.materialService.addMaterial(data)
            .subscribe(response => {
                this.update.emit(response);
                this.snackBar.open('Registro agregado satisfactoriamente...!');
                this.registerForm.reset();
                this.createForm();
                this.inputs.first.nativeElement.focus();
            });
    }

    saveClient(): void {
        this.id ? this.updateMaterial() : this.addMaterial();
    }

    back(): void {
        this.router.navigate(['materiales']);
    }
}


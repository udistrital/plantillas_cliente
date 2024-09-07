import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RequestManager } from '../services/requestManager';
import { UtilService } from '../services/utilService';
import { UserService } from '../services/userService';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Plantilla } from 'src/app/@core/models/plantilla';
import { Respuesta } from 'src/app/@core/models/respuesta';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-creacion-plantilla',
  templateUrl: './creacion-plantilla.component.html',
  styleUrls: ['./creacion-plantilla.component.scss'],
})
export class CreacionPlantillaComponent implements OnInit {
  @ViewChild('formularioP') elementoForm: ElementRef;

  plantillaForm: FormGroup;
  tiposPlantilla = [];
  sendDisabled: boolean = true;
  private subscription: Subscription;

  constructor(
    private request: RequestManager,
    private popUp: UtilService,
    private userService: UserService,
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.plantillaForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscription = this.plantillaForm.valueChanges.subscribe((value) => {
      this.cdr.detectChanges();
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.setPlantilla(params['id']);
      } else {
        console.log('Creación de plantilla');
      }
    });

    this.tiposPlantilla = ['Contrato', 'Acta de inicio', 'Informe', 'Novedad'];
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  guardarPlantilla(): void {
    console.log('guardarPlantilla');
  }

  registrarPlantilla(): void {
    Swal.fire('registrarPlantilla');
  }

  setPlantilla(id: string): void {
    console.log('Llenando campos de plantilla de id: ', id);
  }

  generarPdf() {
    console.log('Generar PDF');
  }
}

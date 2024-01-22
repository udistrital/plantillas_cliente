import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RequestManager } from '../services/requestManager';
import { UtilService } from '../services/utilService';
import { UserService } from '../services/userService';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Seccion } from 'src/app/@core/models/seccion';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormSeccionesComponent } from './form-secciones/form-secciones.component';
import { Plantilla } from 'src/app/@core/models/plantilla';
import { Respuesta } from 'src/app/@core/models/respuesta';

@Component({
  selector: 'app-creacion-plantilla',
  templateUrl: './creacion-plantilla.component.html',
  styleUrls: ['./creacion-plantilla.component.scss'],
})
export class CreacionPlantillaComponent implements OnInit {
  plantillaForm: FormGroup;

  seccionesData: Seccion[] = [];

  ejecutado: boolean = false;
  tiposPlantilla = [];
  tipoSeleccionado: string = '';

  @ViewChild(FormSeccionesComponent) seccionesComponent: FormSeccionesComponent;

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
      nombre: '',
      tipo: '',
      descripcion: '',
      versionActual: 1,
      secciones: this.fb.array([]),
    });
  }

  get secciones() {
    return this.plantillaForm.get('secciones') as FormArray;
  }

  ngOnInit(): void {
    this.tiposPlantilla = [
      { id: 1, Nombre: 'Contrato' },
      { id: 2, Nombre: '' },
      { id: 3, Nombre: 'Acta de inicio' },
      { id: 4, Nombre: 'Informe' },
    ];

    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.llenarCampos(params['id']);
      } else {
        console.log('Creación de plantilla');
      }
    });
  }

  agregarSecciones(seccionesData: Seccion[]) {
    this.seccionesData = seccionesData;

    console.log(this.seccionesData);
  }

  agregarSubseccion(index: number) {
    const nuevaSeccion = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      subsecciones: this.fb.array([]),
    });

    const seccion = this.secciones.at(index) as FormGroup;
    const subsecciones = seccion.get('subsecciones') as FormArray;
    subsecciones.push(nuevaSeccion);
  }

  eliminarSeccion(index: number) {
    this.secciones.removeAt(index);
  }

  generarPlantilla(): void {
    console.log('Generando plantilla: ', this.plantillaForm.value);
    // plantilla enviada desde el componente de secciones
    const plantillaPost = this.plantillaForm.value;
    this.postPlantilla(plantillaPost);
  }

  postPlantilla(plantillaPost: any) {
    console.log('Posteando plantilla: ', plantillaPost);
    try {
      this.request.post(environment.PLANTILLAS_MID_SERVICE, 'plantilla', plantillaPost).subscribe((res) => {
        console.log("Respuesta: ", res);
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  crearPDF(content: any) {
    const options = {
      margin: 10,
      filename: 'documento.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
  }

  llenarCampos(id: string): void {
    console.log('Llenando campos de plantilla de id: ', id);
    if (this.ejecutado === false) {
      try {
        this.request
          .get(environment.PLANTILLAS_SERVICE, 'plantilla')
          .subscribe((res) => {
            this.plantillaForm.setControl(
              'nombre',
              this.fb.control(res.data[0].nombre)
            );
            this.plantillaForm.setControl(
              'tipo',
              this.fb.control(res.data[0].tipo)
            );
            this.plantillaForm.setControl(
              'descripcion',
              this.fb.control(res.data[0].descripcion)
            );
          });
      } catch (error) {
        console.error('Error: ', error);
      }
    }
    this.ejecutado = true;
  }

  actualizarPlantilla(): void {
    const plantillaPost: any = {};
    this.request.put(
      environment.PLANTILLAS_MID_SERVICE, 'plantilla', plantillaPost, '').subscribe({
        next: (response: Respuesta) => {
          if (response.Success) {
            this.popUp.close();
            if (response.Data == null || (response.Data as any).length === 0) {
              this.popUp.warning('Ha ocurrido un error al crear la plantilla');
            } else {
              this.popUp.success('La plantilla se ha creado correctamente');
            }
          }
        }, error: () => {
          this.popUp.close();
          this.popUp.error("No existen peticiones asociadas al coordinador.");
        }
      });
  }
}

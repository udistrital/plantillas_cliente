import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { RequestManager } from '../services/requestManager';
import { UtilService } from '../services/utilService';
import { UserService } from '../services/userService';
import { environment } from 'environments/environment';
import { Plantilla } from 'app/@core/models/plantilla';
import { Respuesta } from 'app/@core/models/respuesta';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Seccion } from 'app/@core/models/seccion';
import { Campo } from 'app/@core/models/campo';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormSeccionesComponent } from './form-secciones/form-secciones.component';

@Component({
  selector: 'app-creacion-plantilla',
  templateUrl: './creacion-plantilla.component.html',
  styleUrls: ['./creacion-plantilla.component.scss']
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
      { id: 1, Nombre: 'Factura'},
      { id: 2, Nombre: 'Contrato'},
      { id: 3, Nombre: 'Acta de inicio'},
      { id: 4, Nombre: 'Informe'},
    ];

    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.llenarCampos(params['id']);
      } else {
        console.log("Creación de plantilla");
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

  agregarTexto(index: number) {

  }

  generarPlantilla(): void {

    console.log("Generando plantilla: ", this.plantillaForm.value);

    const plantillaPost = this.plantillaForm.value;


    // const correct = this.postPlantilla(plantillaPost);

    // const pdf = new jsPDF();
    // pdf.html(html, {
    //   callback: () => {
    //     pdf.save('descarga(0).pdf');
    //   }
    // });

  }

  postPlantilla(plantillaPost: any) {
    console.log("Posteando plantilla: ", plantillaPost);
    // try {
    //   this.request.post(environment.PLANTILLAS_MID_SERVICE, 'plantilla', plantillaPost).subscribe((res) => {
    //     console.log("Respuesta: ", res);
    //   });
    // } catch (error) {
    //   console.error("Error: ", error);
    // }
  }

  crearPDF(content: any) {

    const options = {
      margin: 10,
      filename: 'documento.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    // content = this.plantillaHTML;
    // const content = this.el.nativeElement;

    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(content, {
      callback: (pdf) => {
        pdf.save("test.pdf");
      }
    });
  }

  llenarCampos(id: string): void {
    console.log("Llenando campos de plantilla de id: ", id);
    if (this.ejecutado === false) {
      try {
        this.request.get(environment.PLANTILLAS_SERVICE, 'plantilla').subscribe((res) => {
          this.plantillaForm.setControl('nombre', this.fb.control(res.data[0].nombre));
          this.plantillaForm.setControl('tipo', this.fb.control(res.data[0].tipo));
          this.plantillaForm.setControl('descripcion', this.fb.control(res.data[0].descripcion));
        });
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    this.ejecutado = true;
  }

  actualizarPlantilla(): void {

    // const plantillaPost: Plantilla = {
    //   Id: 0,
    //   Tipo: this.tipo,
    //   Nombre: this.nombre,
    //   Descripcion: this.descripcion,
    //   Contenido: this.contenido,
    //   EnlaceDoc: this.enlace,
    //   Version: 0,
    //   versionActual: this.versionActual,
    //   FechaCreacion: '',
    //   FechaModificacion: '',
    //   Activo: true
    // };

    // this.request.put(
    //   environment.PLANTILLAS_MID_SERVICE, 'plantilla', plantillaPost).subscribe({
    //     next: (response: Respuesta) => {
    //       if (response.Success) {
    //         this.popUp.close();
    //         if (response.Data == null || (response.Data as any).length === 0) {
    //           this.popUp.warning('Ha ocurrido un error al crear la plantilla');
    //         } else {
    //           this.popUp.success('La plantilla se ha creado correctamente');
    //         }
    //       }
    //     }, error: () => {
    //       this.popUp.close();
    //       this.popUp.error("No existen peticiones asociadas al coordinador.");
    //     }
    //   });
  }

}

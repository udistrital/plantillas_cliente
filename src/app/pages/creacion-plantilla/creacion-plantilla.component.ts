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
// import { ScrollingModule } from '@angular/cdk/scrolling';

const pdf = new jsPDF();

@Component({
  selector: 'app-creacion-plantilla',
  templateUrl: './creacion-plantilla.component.html',
  styleUrls: ['./creacion-plantilla.component.scss']
})
export class CreacionPlantillaComponent implements OnInit {

  plantillaForm: FormGroup;

  @ViewChild('content', { static: false }) el!: ElementRef;

  pdfSrc: string;

  plantillaHTML: string = `
    <div>
      <h1>Mi Plantilla HTML</h1>
      <p>Contenido de la plantilla...</p>
    </div>
  `;

  constructor(
    private request: RequestManager,
    private popUp: UtilService,
    private userService: UserService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.plantillaForm = this.fb.group({
      nombre: '',
      tipo: '',
      descripcion: '',
      versionActual: 1,
      secciones: this.fb.array([]),
    });
    const seccion = this.fb.group({
      Posicion: 1,
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Campo: '',
      EstiloFuente: ['', Validators.required],
    });
    this.secciones.push(seccion);
  }

  get secciones() {
    return this.plantillaForm.get('secciones') as FormArray;
  }

  ngOnInit(): void {
  }

  agregarSeccion() {
    console.log("Agregando seccion: ", this.secciones);
    if (this.secciones) {
      const seccion = this.fb.group({
        Posicion: '',
        Nombre: ['', Validators.required],
        Descripcion: ['', Validators.required],
        Campo: '',
        EstiloFuente: ['', Validators.required],
      });
      this.secciones.push(seccion);

    } else {
      console.error("Formulario no inicializado correctamente");
    }
  }

  eliminarSeccion(index: number) {
    this.secciones.removeAt(index);
  }

  generarPlantilla(): void {
    console.log("Generando plantilla: ", this.plantillaForm.value);

    const plantillaPost = this.plantillaForm.value;


    const correct = this.postPlantilla(plantillaPost);

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

}

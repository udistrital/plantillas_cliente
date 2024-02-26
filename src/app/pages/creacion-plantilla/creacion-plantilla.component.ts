import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, forwardRef } from '@angular/core';
import { RequestManager } from '../services/requestManager';
import { UtilService } from '../services/utilService';
import { UserService } from '../services/userService';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Seccion } from 'src/app/@core/models/seccion';
import { FormBuilder, FormGroup, Validators, FormArray, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormSeccionesComponent } from './form-secciones/form-secciones.component';
import { Plantilla } from 'src/app/@core/models/plantilla';
import { Respuesta } from 'src/app/@core/models/respuesta';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-creacion-plantilla',
  templateUrl: './creacion-plantilla.component.html',
  styleUrls: ['./creacion-plantilla.component.scss'],
})
export class CreacionPlantillaComponent implements OnInit {

  //
  @ViewChild(FormSeccionesComponent) seccionesComponent: FormSeccionesComponent;
  @ViewChild('formularioP') elementoForm: ElementRef;


  plantillaForm: FormGroup;

  tiposPlantilla = [];
  tipoSeleccionado: string = '';

  ejecutado: boolean = false;
  seccionDisabled: boolean = false;
  sendDisabled: boolean = true;

  seccionesData: FormArray;

  seccionesVista = [];

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
      nombre: ['Nombre', Validators.required],
      tipo: ['Tipo', Validators.required],
      secciones: this.fb.array([]),
    });
  }

  ngOnInit(): void {

    this.subscription =  this.plantillaForm.valueChanges.subscribe((value) => {
      this.cdr.detectChanges();
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.llenarCampos(params['id']);
      } else {
        console.log('Creación de plantilla');
      }
    });

    this.tiposPlantilla = [
      'Contrato',
      'Acta de inicio',
      'Informe',
      'Novedad',
    ];
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // TODO: Agregar secciones

  // Funciones para la creacion de plantillas

  crearSeccion() {
    let secciones = this.plantillaForm.get('secciones') as FormArray;
    secciones.push(this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      campos: this.fb.array([]),
      direccion: ['', Validators.required],
    }));
  }

  manejoSecciones(formSecciones: FormGroup) {
    // console.log('Recibiendo secciones: ', formSecciones);
    // const val = formSecciones.value;
    // this.seccionesData = formSecciones;
    // this.seccionesVista = val.secciones;
    // console.log(this.seccionesVista);
  }

  guardarPlantilla(): void {
    // this.seccionesComponent.enviarSecciones();
    console.log("seccionesData: ", this.seccionesData);
  }


  enviarPlantilla2(): void {
    Swal.fire("SweetAlert2 is working!");
  }
  // ...

  enviarPlantilla(): void {
    console.log('Generando plantilla: ', this.plantillaForm.value);
    const plantillaPost = this.plantillaForm.value;
    try {
      this.request.post(environment.PLANTILLAS_MID_SERVICE, 'plantilla', plantillaPost).subscribe((res) => {
        console.log("Respuesta: ", res);
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  // ! Asignación de valores a campos de plantilla debe corregirse

  llenarCampos(id: string): void {
    console.log('Llenando campos de plantilla de id: ', id);
    if (this.ejecutado === false) {
      try {
        this.request
          .get(environment.PLANTILLAS_SERVICE, 'plantilla/' + id)
          .subscribe((res) => {
            // this.plantillaForm.setControl(
            //   'nombre',
            //   this.fb.control(res.data[0].nombre)
            // );
            // this.plantillaForm.get('tipo').setValue(res.data[0].tipo);
            // this.plantillaForm.setControl(
            //   'descripcion',
            //   this.fb.control(res.data[0].descripcion)
            // );
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

  generarPdf() {
    // const data = document.createElement('div');
    // data.innerHTML = this.elementoForm.nativeElement.innerHTML;
    // data.style.marginTop = '50px';
    // document.body.appendChild(data);
    // const alturaForm = this.elementoForm.nativeElement.offsetHeight;
    // console.log(this.elementoForm.nativeElement.offsetHeight);
    // const data1 = this.elementoForm.nativeElement;
    var elementHeight = this.elementoForm.nativeElement.offsetHeight;

    const data1 = document.getElementById('elementoPlantilla');

    const elements = document.querySelectorAll('.elementClass');
    const doc = new jspdf('p', 'px', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    var actualY = 0;
    // elements.forEach((element, index) => {
    //   html2canvas(element as HTMLElement).then((canvas) => {
    //     const image = canvas.toDataURL('image/jpeg', 1.0);

    //     const widthRatio = pageWidth / canvas.width;
    //     const heightRatio = pageHeight / canvas.height;
    //     const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
    //     const scale = 0.5;
    //     const canvasWidth = canvas.width * ratio * scale;
    //     const canvasHeight = canvas.height * ratio * scale
    //     var marginX = 0;
    //     var marginY = actualY + (pageHeight - canvasHeight) / 2;

    //     doc.addImage(image, 'JPEG', marginX, marginY, canvasWidth, canvasHeight);

    //     const remainingSpace = pageWidth - (marginX + canvasWidth);
    //     const nextElementWidth = 100;
    //     if (remainingSpace < nextElementWidth) {
    //       marginX = 0;
    //       marginY += canvasHeight;
    //     } else {
    //       marginX += canvasWidth;
    //     }

    //     if (index === elements.length - 1) {
    //       doc.save('Plantilla.pdf');
    //     }
    //   });
    //   actualY += 10;
    // });
    html2canvas(data1).then(canvas => {

      const image = canvas.toDataURL('image/jpeg', 1.0);

      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      const canvasWidth = canvas.width * ratio * 1.5;
      const canvasHeight = canvas.height * ratio * 1.5;

      var marginX = 10;
      var marginY = 10;

      doc.addImage(image, 'JPEG', marginX, marginY, canvasWidth, canvasHeight);

      const remainingSpace = pageWidth - (marginX + canvasWidth);
      const nextElementWidth = 100;
      if (remainingSpace < nextElementWidth) {
        marginX = 10;
        marginY += canvasHeight;
      } else {
        marginX += canvasWidth;
      }

      doc.save('new-file.pdf');
    });
  }

}

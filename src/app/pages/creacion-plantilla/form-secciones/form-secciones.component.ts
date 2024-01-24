import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ChangeDetectorRef,
  Input,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Seccion } from 'src/app/@core/models/seccion';

@Component({
  selector: 'app-form-secciones',
  templateUrl: './form-secciones.component.html',
  styleUrls: ['./form-secciones.component.scss'],
})
export class FormSeccionesComponent implements OnInit {

  textAreaContent: string[] = [];
  @ViewChildren('textareaRef') textareaRefs: QueryList<ElementRef>;

  @Output() seccionesData = new EventEmitter<any>();
  @Input() nivel: number = 1.0;
  @Input() maxNivel: number = 5.0;

  seccionesForm: FormGroup;

  iconSizes: string = 25 / (this.nivel) + 'px';

  estilosFUente: string[] = [];
  tamanosFuente: number[] = [];

  camposImagen: boolean[] = [];
  imagenUrls: string[] = [];

  private disabledButtons: boolean[] = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {

    this.seccionesForm = this.fb.group({
      secciones: this.fb.array([]),
    });

    this.listaSecciones.push(
      this.fb.group({
        posicion: 0,
        nombre: ['Seccion 1 Name', Validators.required],
        descripcion: ['Esta sería la sección 1 y su descripción', Validators.required],
        campos: this.fb.array([]),
        estiloFuente: '',
        fechaCreacion: '',
        fechaModificacion: '',
        activo: true,
      })
    );

    const nuevoCampo = this.fb.group({
      nombre: ['Párrafo de texto', Validators.required],
      dataString: 'Texto1',
      dataBinary: '',
      estiloFuente: 'Arial, sans-serif',
      tamanoFuente: 16,
      fechaCreacion: '',
      fechaModificacion: '',
      imagen: true,
    });

    const nuevaImagen = this.fb.group({
      nombre: ['Nombre de la imagen', Validators.required],
      dataString: 'Imagen1',
      dataBinary: '',
      estiloFuente: 'Arial, sans-serif',
      tamanoFuente: 16,
      fechaCreacion: '',
      fechaModificacion: '',
      imagen: true,
    });

    const camposControl = (this.listaSecciones.controls[0] as FormGroup).get(
      'campos'
    ) as FormArray || this.fb.array([]);

    if (camposControl instanceof FormArray) {
      console.log(camposControl);
      camposControl.push(nuevoCampo);
    } else {
      console.error("'campos' no es un FormArray");
    }
  }

  actualizarTamano(event: any, j: number) {
    this.tamanosFuente[j] = Number(event.target.value);
  }

  actualizarFuente(event: any, j: number) {
    this.estilosFUente[j] = event.value;
  }

  insertarCampo(j: number) {
    console.log("indice: ", j);
    const text = " [ _ ] ";
    const textArea = this.textareaRefs.toArray()[j].nativeElement as HTMLTextAreaElement;
    const startPos = textArea.selectionStart;
    const endPos = textArea.selectionEnd;
    this.textAreaContent[j] = this.textAreaContent[j].substring(0, startPos) + text + this.textAreaContent[j].substring(endPos, this.textAreaContent[j].length);
    textArea.selectionStart = startPos + text.length;
    textArea.selectionEnd = startPos + text.length;
  }

  calcularNivel(index: number, nivel: number): number {
    // console.log(index);
    // console.log(nivel*0.1);
    // const next = index + nivel + 0.1;
    return nivel + 1;
  }

  enviarSecciones(event: Event) {
    event.stopPropagation();
    const data: Seccion[] = [
      {
        posicion: 1,
        nombre: 'Seccion 1',
        descripcion: 'Descripcion de la seccion 1',
        campos: [],
        subSecciones: [],
        estiloFuente: null,
        fechaCreacion: '',
        fechaModificacion: '',
        activo: true,
      },
      {
        posicion: 2,
        nombre: 'Seccion 2',
        descripcion: 'Descripcion de la seccion 2',
        campos: [],
        subSecciones: [],
        estiloFuente: null,
        fechaCreacion: '',
        fechaModificacion: '',
        activo: true,
      },
      {
        posicion: 3,
        nombre: 'Seccion 3',
        descripcion: 'Descripcion de la seccion 3',
        campos: [],
        subSecciones: [],
        estiloFuente: null,
        fechaCreacion: '',
        fechaModificacion: '',
        activo: true,
      },
    ];
    console.log(data);
    this.seccionesData.emit(data);
  }

  agregarSeccion(index: number) {
    if (this.listaSecciones) {
      this.disabledButtons[index] = true;
      const nuevaSeccion = this.fb.group({
        posicion: 0,
        nombre: ['Nombre de sección 2', Validators.required],
        descripcion: ['No hay', Validators.required],
        campos: this.fb.array([]),
        estiloFuente: '',
        fechaCreacion: '',
        fechaModificacion: '',
        activo: true,
      });
      this.listaSecciones.push(nuevaSeccion);
      this.listaSecciones.updateValueAndValidity();
      this.cdr.detectChanges();
    } else {
      console.error('Formulario no inicializado correctamente');
    }
  }

  eliminarSeccion(index: number) {
    this.listaSecciones.removeAt(index);
    this.disabledButtons.splice(index, 1);
    // this.disabledButtons[index - 1] = false;
  }

  subirSeccion(i: number, j: number) {
    const seccion = this.listaSecciones.at(i) as FormGroup;
    const seccionAnterior = this.listaSecciones.at(j) as FormGroup;
    this.listaSecciones.setControl(i, seccionAnterior);
    this.listaSecciones.setControl(j, seccion);
    this.disabledButtons[i] = false;
    this.disabledButtons[j] = true;
  }

  agregarCampo(index: number) {
    console.log("indice: ", index)
    const nuevoCampo = this.fb.group({
      // nombre: ['', Validators.required],
      // descripcion: ['', Validators.required],
      dataString: '',
      dataBinary: '',
      estiloFuente: 'Arial, sans-serif',
      tamanoFuente: 16,
      fechaCreacion: '',
      fechaModificacion: '',
      imagen: true
    });
    const camposControl = (this.listaSecciones.controls[index] as FormGroup).get('campos') as FormArray;
    camposControl.push(nuevoCampo);
    this.estilosFUente.push('Arial, sans-serif');
    this.tamanosFuente.push(12);
    this.camposImagen.push(false);
  }

  eliminarCampo(i: number, j: number) {
    const camposControl = (this.listaSecciones.controls[i] as FormGroup).get('campos') as FormArray;
    camposControl.removeAt(j);
  }

  agregarImagen(index: number) {
    const nuevaImagen = this.fb.group({
      // nombre: ['', Validators.required],
      // descripcion: ['', Validators.required],
      dataString: '',
      dataBinary: '',
      estiloFuente: 'Arial, sans-serif',
      tamanoFuente: 16,
      fechaCreacion: '',
      fechaModificacion: '',
      imagen: true
    });
    const camposControl = (this.listaSecciones.controls[index] as FormGroup).get('campos') as FormArray;
    camposControl.push(nuevaImagen);
    this.camposImagen.push(true);
    this.imagenUrls.push('../../../../assets/inosuke.jpg');
  }

  onselectFile(event: any) {
    console.log("Eu");
    if (event.target.files && event.target.files.length) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.imagenUrls.push(e.target.result);
      };
    }
  }

  agregarTabla(index: number) {
    console.log("Tabla");
  }

  esSubseccion(index: number): boolean {
    return index > 0;
  }

  isButtonDisabled(index: number): boolean {
    return this.disabledButtons[index];
  }

  get listaSecciones() {
    return (
      (this.seccionesForm.get('secciones') as FormArray) || this.fb.array([])
    );
  }
}

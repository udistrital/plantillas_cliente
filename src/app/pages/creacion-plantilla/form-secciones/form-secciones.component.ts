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
  forwardRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-form-secciones',
  templateUrl: './form-secciones.component.html',
  styleUrls: ['./form-secciones.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormSeccionesComponent),
    multi: true
  }],
})
export class FormSeccionesComponent implements ControlValueAccessor, OnInit {

  @Output() seccionesData = new EventEmitter<FormArray>();
  @Input() nivel: number = 1.0;
  @Input() maxNivel: number = 5.0;

  @Input() seccionesForm: FormGroup;

  //variables para el control de formulario (ControlValueAccessor)
  onChange: any = () => { };
  onTouch: any = () => { };

  // textAreaContent: string[] = [];
  // @ViewChildren('textareaRef') textareaRefs: QueryList<ElementRef>;

  secciones: FormArray;

  iconSizes: string = 25 / (this.nivel) + 'px';

  estilosFUente: string[] = [];
  tamanosFuente: number[] = [];
  fontstyle: string[] = [];
  negrita: string[] = [];

  camposImagen: number[] = [];
  imagenUrls: string[] = [];

  // estilo de iconos de botones de secciones

  iconStyles = {
    'line-height': this.iconSizes,
    'font-size': this.iconSizes,
    'width': this.iconSizes,
    'height': this.iconSizes
  };

  private disabledButtons: boolean[] = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    let secciones = this.fb.array([
      this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        campos: this.fb.array([]),
        direccion: ['', Validators.required],
      })
    ]);
    this.seccionesForm.setControl('secciones', secciones);
  }

  // Funciones para el control del formulario de secciones

  writeValue(obj: any): void {
    console.log("writeValue");
    if (obj != undefined) {
      this.secciones.setValue(obj, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    console.log("registerOnChange");
    this.onChange = fn;
    this.seccionesForm.get('secciones').valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    console.log("registerOnTouched");
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    console.log("setDisabledState");
    if (isDisabled) {
      this.seccionesForm.get('secciones').disable();
    } else {
      this.seccionesForm.get('secciones').enable();
    }
  }

  // TODO: Agregar secciones

  // Funciones para la creación de secciones

  public agregarSeccion(index?: number) {

    let nuevaSeccion = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      campos: this.fb.array([]),
      direccion: ['', Validators.required],
    });

    let seccionesArray = this.seccionesForm.get('secciones') as FormArray;

    seccionesArray.push(nuevaSeccion);

  }

  eliminarSeccion(index: number) {
    let seccionesArray = this.seccionesForm.get('secciones') as FormArray;
    seccionesArray.removeAt(index);
  }

  getSeccionesLength(): number {
    return this.seccionesForm.get('secciones').value.length - 1;
  }

  cambiarDireccion(index: number, event: any) {
    let seccion = this.seccionesForm.get('secciones') as FormArray;
    seccion.at(index).get('direccion').setValue(event.value);
  }

  // Funciones para la creación de campos

  agregarCampo(index: number) {

    let nuevoCampo = this.fb.group({
      nombre: ['Campo seccion ' + index, Validators.required],
      dataString: '',
      dataBinary: '',
      estiloFuente: 'Arial, sans-serif',
      tamanoFuente: 16,
    });

    let seccion = this.seccionesForm.get('secciones') as FormArray;
    let campos = seccion.at(index).get('campos') as FormArray;

    campos.push(nuevoCampo);
  }

  eliminarCampo(i: number, j: number) {
    let seccion = this.seccionesForm.get('secciones') as FormArray;
    let campos = seccion.at(i).get('campos') as FormArray;
    campos.removeAt(j);
  }

  // Funciones para la creación de subsecciones

  agregarSubseccion(index: number) {
    let nuevaSubseccion = this.fb.array([
      this.fb.group({
        nombre: ['Subseccion 1', Validators.required],
      }),
      this.fb.group({
        nombre: ['Subseccion 2', Validators.required],
      }),
    ])

    let seccion = this.seccionesForm.get('secciones') as FormArray;
    let campos = seccion.at(index).get('campos') as FormArray;

    campos.push(nuevaSubseccion);
  }

  esSubseccion(campo: any): boolean {
    return campo instanceof FormArray
  }

  // Funciones para el cambio de posición de secciones y campos

  intercambioSeccion(i: number, j: number) {
    if (j != -1) {
      const secciones = this.seccionesForm.get('secciones') as FormArray;
      const seccionI = secciones.at(i) as FormGroup;
      const seccionAnterior = secciones.at(j) as FormGroup;
      secciones.setControl(i, seccionAnterior);
      secciones.setControl(j, seccionI);
    }
  }

  intercambioCampo(i: number, j: number, k: number) {
    if (k != -1) {
      const secciones = this.seccionesForm.get('secciones') as FormArray;
      const seccion = secciones.at(i) as FormGroup;
      const campos = seccion.get('campos') as FormArray;
      const campo = campos.at(j) as FormGroup;
      const campoAnterior = campos.at(k) as FormGroup;
      campos.setControl(j, campoAnterior);
      campos.setControl(k, campo);
    }
  }

  // ! Estas funciones no manejan bien los casos de subsecciones

  actualizarTamano(event: any, j: number) {
    this.tamanosFuente[j] = Number(event.target.value);
  }

  actualizarFuente(event: any, j: number) {
    this.estilosFUente[j] = event.value;
  }

  actualizarPeso(event: any, j: number) {
    this.negrita[j] = event.checked ? 'bold' : 'normal';
  }

  actualizarEstilo(event: any, j: number) {
    this.fontstyle[j] = event.checked ? 'italic' : 'normal';
  }

  insertarCampo(j: number) {
    // console.log("indice: ", j);
    // const text = " [ _ ] ";
    // const textArea = this.textareaRefs.toArray()[j].nativeElement as HTMLTextAreaElement;
    // const startPos = textArea.selectionStart;
    // const endPos = textArea.selectionEnd;
    // this.textAreaContent[j] = this.textAreaContent[j].substring(0, startPos) + text + this.textAreaContent[j].substring(endPos, this.textAreaContent[j].length);
    // textArea.selectionStart = startPos + text.length;
    // textArea.selectionEnd = startPos + text.length;
  }

  calcularNivel(index: number, nivel: number): number {
    // console.log(index);
    // console.log(nivel*0.1);
    // const next = index + nivel + 0.1;
    return nivel + 1;
  }

  enviarSecciones() {
    // event.stopPropagation();
    const dataEmit = this.fb.array([
      this.fb.group({
        posicion: 1,
        nombre: ['Sección Número 1', Validators.required],
        descripcion: ['Descripción de la sección Número 1', Validators.required],
        campos: this.fb.array([
          this.fb.group({
            nombre: ['Texto1', Validators.required],
            dataString: 'Contenido del campo 1',
            dataBinary: '',
            estiloFuente: 'Times New Roman, serif',
            tamanoFuente: 19,
            negrita: 'bold',
            cursiva: 'italic',
            fechaCreacion: '',
            fechaModificacion: '',
            tipo: 1,
          }),
          this.fb.group({
            nombre: ['Imagen', Validators.required],
            dataString: '',
            dataBinary: '',
            estiloFuente: '',
            tamanoFuente: 13,
            ancho: 200,
            alto: 150,
            fechaCreacion: '',
            fechaModificacion: '',
            tipo: 1,
          }),
        ]),
        estiloFuente: '',
        fechaCreacion: '',
        fechaModificacion: '',
        activo: true,
      }),
      this.fb.group({
        posicion: 0,
        nombre: ['Seccion 2 Name', Validators.required],
        descripcion: ['Esta sería la sección 2 y su descripción', Validators.required],
        campos: this.fb.array([
          this.fb.group({
            nombre: ['Texto1', Validators.required],
            dataString: 'Contenido del campo 1 seccion 2',
            dataBinary: '',
            estiloFuente: 'Arial, sans-serif',
            tamanoFuente: 15,
            negrita: 'normal',
            cursiva: 'normal',
            fechaCreacion: '',
            fechaModificacion: '',
            tipo: 1,
          }),
          this.fb.group({
            nombre: ['Nombre del campo', Validators.required],
            dataString: 'Contenido del campo 2 seccion 2',
            dataBinary: '',
            estiloFuente: 'Helvetica, sans-serif',
            tamanoFuente: 13,
            negrita: 'bold',
            cursiva: 'normal',
            fechaCreacion: '',
            fechaModificacion: '',
            tipo: 1,
          }),
        ]),
        estiloFuente: '',
        fechaCreacion: '',
        fechaModificacion: '',
        activo: true,
      }),
      this.fb.group({
        posicion: 1,
        nombre: ['Nombre de la seccion 3', Validators.required],
        descripcion: ['Descricpción', Validators.required],
        campos: this.fb.array([
          this.fb.group({
            nombre: ['Nombre 3', Validators.required],
            dataString: 'Contenido del campo 1 seccion 3',
            dataBinary: '',
            estiloFuente: 'Times New Roman, serif',
            tamanoFuente: 19,
            negrita: 'bold',
            cursiva: 'italic',
            fechaCreacion: '',
            fechaModificacion: '',
            tipo: 1,
          }),
          this.fb.group({
            nombre: ['Imagen', Validators.required],
            dataString: 'Colocar aquí el texto',
            dataBinary: '',
            estiloFuente: '',
            tamanoFuente: 13,
            ancho: 200,
            alto: 150,
            fechaCreacion: '',
            fechaModificacion: '',
            tipo: 1,
          }),
        ]),
        estiloFuente: '',
        fechaCreacion: '',
        fechaModificacion: '',
        activo: true,
      }),
    ]);
    this.seccionesData.emit(dataEmit);
    // this.seccionesData.emit(this.seccionesForm.value);
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
      tipo: 2
    });
    const camposControl = (this.listaSecciones.controls[index] as FormGroup).get('campos') as FormArray;
    camposControl.push(nuevaImagen);
    this.camposImagen.push(2);
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

  // esSubseccion(index: number): boolean {
  //   return index > 0;
  // }

  isButtonDisabled(index: number): boolean {
    return this.disabledButtons[index];
  }

  get listaSecciones() {
    return (
      (this.secciones.get('secciones') as FormArray) || this.fb.array([])
    );
  }

}
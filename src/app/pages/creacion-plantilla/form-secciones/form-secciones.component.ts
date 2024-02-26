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

  widthCampos(index: number): string {
    const secciones = this.seccionesForm.get('secciones') as FormArray;
    const seccion = secciones.at(index) as FormGroup;
    const direccion = seccion.get('direccion').value;
    if (direccion == 'column') {
      return '100%';
    } else {
      return '25%';
    }
  }

  heightCampos(): string {
    return '100%';
  }

  // Funciones para la creación de campos

  agregarCampo(index: number) {

    let nuevoCampo = this.fb.group({
      nombre: ['Campo seccion ' + index, Validators.required],
      dataString: '',
      dataBinary: '',
      estiloFuente: 'Arial',
      tamanoFuente: 16,
      negrita: 'normal',
      cursiva: 'normal',
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

    let nuevaSubseccion = this.fb.group({
      secciones: this.fb.array([])
    });

    let seccion = this.seccionesForm.get('secciones') as FormArray;
    let campos = seccion.at(index).get('campos') as FormArray;

    campos.push(nuevaSubseccion);
  }

  esSubseccion(campo: FormGroup): boolean {
    return campo.contains('secciones');
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

  // Funciones para el cambio de estilo de fuente de campos

  getStyle(i: number, j: number) {
    const seccion = (this.seccionesForm.get('secciones') as FormArray).at(i) as FormGroup;
    const campo = (seccion.get('campos') as FormArray).at(j) as FormGroup;
    return {
      'font-size': campo.get('tamanoFuente').value + 'px',
      'font-family': campo.get('estiloFuente').value + ', sans-serif',
      'font-weight': campo.get('negrita').value,
      'font-style': campo.get('cursiva').value,
    }
  }

  // Negrita
  actualizarPeso(event: any, i: number, j: number) {
    const seccion = (this.seccionesForm.get('secciones') as FormArray).at(i) as FormGroup;
    const campo = (seccion.get('campos') as FormArray).at(j) as FormGroup;
    campo.get('negrita').setValue(event.checked ? 'bold' : 'normal');
  }

  // Cursiva
  actualizarEstilo(event: any, i: number, j: number) {
    const seccion = (this.seccionesForm.get('secciones') as FormArray).at(i) as FormGroup;
    const campo = (seccion.get('campos') as FormArray).at(j) as FormGroup;
    campo.get('cursiva').setValue(event.checked ? 'italic' : 'normal');
  }

  // ! Estas funciones no manejan bien los casos de subsecciones


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

  get listaSecciones() {
    return (
      (this.secciones.get('secciones') as FormArray) || this.fb.array([])
    );
  }

}
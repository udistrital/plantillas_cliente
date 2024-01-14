import { Component, EventEmitter, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Seccion } from 'app/@core/models/seccion';

@Component({
  selector: 'app-form-secciones',
  templateUrl: './form-secciones.component.html',
  styleUrls: ['./form-secciones.component.scss']
})
export class FormSeccionesComponent implements OnInit {

  seccionesForm: FormGroup;

  @Output() seccionesData = new EventEmitter<any>();

  private disabledButtons: boolean[] = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.seccionesForm = this.fb.group({
      secciones: this.fb.array([]),
    });
  }

  ngAfterViewInit() {
    this.listaSecciones.push(this.fb.group({
      posicion: 0,
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      campos: '',
      estiloFuente: ['', Validators.required],
      fechaCreacion: '',
      fechaModificacion: '',
      activo: true,
    }));
  }

  get listaSecciones() {
    return this.seccionesForm.get('secciones') as FormArray || this.fb.array([]);
  }

  ngOnInit(): void {
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
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        campos: '',
        estiloFuente: ['', Validators.required],
        fechaCreacion: '',
        fechaModificacion: '',
        activo: true,
      });
      this.listaSecciones.push(nuevaSeccion);
      this.listaSecciones.updateValueAndValidity();
      this.cdr.detectChanges();
    } else {
      console.error("Formulario no inicializado correctamente");
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

    console.log(i, j);
    // const seccionAnterior = this.listaSecciones.controls[i];
    // const seccion = this.listaSecciones.controls[j];

    // console.log(seccionAnterior, seccion);
    
    // // this.listaSecciones.removeAt(j);
    // this.listaSecciones.insert(j, seccionAnterior)
  }

  agregarTexto(index: number) {
    console.log("Texto");
  }

  agregarCampo(index: number) {
    console.log("Campo");
  }

  agregarImagen(index: number) {
    console.log("Imagen");
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

}

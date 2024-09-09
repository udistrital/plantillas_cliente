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
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-creacion-plantilla',
  templateUrl: './creacion-plantilla.component.html',
  styleUrls: ['./creacion-plantilla.component.scss'],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
})
export class CreacionPlantillaComponent implements OnInit {
  plantillaForm: FormGroup;
  tiposPlantilla = [];
  sendDisabled: boolean = true;
  private subscription: Subscription;
  editor: EditorComponent['init'] = {
    suffix: '.min',
    base_url: '/tinymce',
    language_url: '/assets/tinymce/langs/es_MX.js',
    language: 'es_MX',
    menubar: false,
    statusbar: false,
    plugins:
      'autolink charmap directionality emoticons image insertdatetime link lists advlist preview searchreplace table wordcount',
    toolbar: `undo redo | styles forecolor | bold italic | align numlist bullist
      | outdent indent | link image | table tabledelete | tableprops tablerowprops tablecellprops | charmap emoticons | ltr rtl | insertdatetime | searchreplace wordcount | preview`,
    toolbar_mode: 'sliding',
    file_picker_types: 'image',
    file_picker_callback: this.cargarImagen.bind(this),
  };

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
      contenido: ['', Validators.required],
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

  cargarImagen(callback: any, value: any, meta: any) {
    // Crear input para seleccionar archivos
    const input: any = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    // INsertar el archivo en el editor
    input.onchange = function () {
      const file = input.files[0];
      const reader: any = new FileReader();
      reader.onload = function (e: any) {
        const base64 = reader.result.toString();
        callback(base64, { alt: file.name });
      };
      reader.readAsDataURL(file);
    };
    input.click(); // Disparar el input
  }

  guardarPlantilla(): void {
    console.log('guardarPlantilla');
  }

  registrarPlantilla(): void {
    Swal.fire('registrarPlantilla');
  }

  setPlantilla(id: string): void {
    console.log('setPlantilla: ', id);
  }

  generarPdf() {
    console.log('generarPdf');
  }
}

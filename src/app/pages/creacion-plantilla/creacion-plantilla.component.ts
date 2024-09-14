import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  tiposPlantilla: string[] = ['Contrato', 'Acta de inicio', 'Informe', 'Novedad'];
  sistemas: string[] = ['SISGPLAN', 'SGA', 'POLUX'];
  campos_dinamicos: string[] = [];

  private subscription: Subscription;

  editor: EditorComponent['init'] = {
    suffix: '.min',
    base_url: '/tinymce',
    language_url: '/assets/tinymce/langs/es_MX.js',
    language: 'es_MX',
    menubar: false,
    statusbar: false,
    plugins: 'autolink charmap directionality emoticons image insertdatetime link lists advlist preview searchreplace table wordcount',
    toolbar: `undo redo | styles forecolor | bold italic | align numlist bullist | outdent indent | campoDinamico | link image | table tabledelete | tableprops tablerowprops tablecellprops | charmap emoticons | ltr rtl | insertdatetime | searchreplace wordcount | preview`,
    toolbar_mode: 'sliding',
    file_picker_types: 'image',
    // file_picker_callback: this.cargarImagen.bind(this),
    setup: this.configurarEditor.bind(this)
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
      sistema: ['', Validators.required],
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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  cargarImagen(callback: any, value: any, meta: any) {
    // Crear input para seleccionar archivos
    const input: any = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    // Insertar el archivo en el editor
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

  configurarEditor(editor: any) {
    editor.ui.registry.addButton('campoDinamico', {
      // text: 'Insertar Campo Dinámico',
      icon: 'comment-add',
      tooltip: 'Insertar Campo Dinámico',
      onAction: () => this.abrirDialogoCampoDinamico(editor)
    });

    editor.on('input', () => this.actualizarCamposDinamicos(editor.getContent()))
  }

  abrirDialogoCampoDinamico(editor: any) {
    editor.windowManager.open({
      title: 'Agregar campo dinámico',
      body: {
        type: 'panel',
        items: [{ type: 'input', name: 'campo_dinamico', label: 'Nombre del campo' }]
      },
      buttons: [
        { type: 'cancel', text: 'Cancelar' },
        { type: 'submit', text: 'Guardar', primary: true }
      ],
      onSubmit: (api: any) => {
        const data = api.getData();
        const content = `<span contenteditable="false" class="dynamic-field" style="display: inline-block; padding: 5px; border: 1px solid #ccc;" data-contenteditable="false">{{${data.campo_dinamico}}}</span>`;
        editor.insertContent(content);
        this.campos_dinamicos.push(data.campo_dinamico);
        api.close();
      }
    });
  }

  actualizarCamposDinamicos(content: string): void {
    // Crear un documento a partir del contenido actual del editor
    const doc = new DOMParser().parseFromString(content, 'text/html');

    // Obtener los campos dinámicos que todavía están en el contenido del editor
    const camposActuales: string[] = [];
    doc.querySelectorAll('span.dynamic-field').forEach(span => {
      const campoDinamico = span.textContent.trim().replace('{{', '').replace('}}', '');
      camposActuales.push(campoDinamico);
    });

    // Filtrar los campos dinámicos eliminados
    this.campos_dinamicos = this.campos_dinamicos.filter(campo => camposActuales.includes(campo));
  }

  setPlantilla(id: string): void {
    console.log('setPlantilla: ', id);
  }

  guardarPlantilla(): void {
    const content = this.plantillaForm.value.contenido;

    // Crear un documento a partir del contenido actual del editor
    const doc = new DOMParser().parseFromString(content, 'text/html');

    // Reemplaza todos los spans con la clase `dynamic-field` por su contenido sin etiquetas
    doc.querySelectorAll('span.dynamic-field').forEach(span => {
      span.replaceWith(span.textContent.trim()); // Reemplaza el span por solo su contenido (el `{{campo_dinamico}}`)
    });

    // Obtener el contenido final procesado, que solo tendrá `{{campo_dinamico}}`
    const contenidoFinal = doc.body.innerHTML;
    console.log({ contenido: contenidoFinal, campos_dinamicos: this.campos_dinamicos });
  }

  generarPdf() {
    console.log('generarPdf');
  }

  registrarPlantilla(): void {
    console.log('registrarPlantilla');
  }
}

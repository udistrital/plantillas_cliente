import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RequestManager } from '../services/requestManager';
import { UtilService } from '../services/utilService';
import { UserService } from '../services/userService';
import { TablaPlantilla } from 'src/app/@core/models/tablaPlantilla';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-vista-plantillas',
  templateUrl: './vista-plantillas.component.html',
  styleUrls: ['./vista-plantillas.component.scss'],
})
export class VistaPlantillasComponent implements OnInit {

  plantillasSettings: any;
  ejecutado: boolean = false;

  dataPlantillas: LocalDataSource;

  dataEmit: any;
  seccionesVista = [];

  constructor(
    private request: RequestManager,
    private router: Router,
    private popUp: UtilService,
    private userService: UserService,
    private fb: FormBuilder,
  ) {

    this.dataEmit = this.fb.group({
      secciones: this.fb.array([
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
      ]),
    });
  

    this.initTable();
    // const plantillas = [plantilla1, plantilla2, plantilla3, plantilla4, plantilla5];
    // this.dataPlantillas = new LocalDataSource(plantillas);
  }

  ngOnInit(): void {
    this.consultarPlantillas();
  }

  initTable(): void {
    this.plantillasSettings = {
      selectMode: 'multi',
      columns: TablaPlantilla,
      mode: 'external',
      actions: {
        add: false,
        edit: false,
        delete: false,
        position: 'left',
        columnTitle: 'Acciones',
        custom: [
          {
            name: 'Editar',
            icon: '<i class="nb-close inline-block width: 50px"></i>',
            template: '<i class="nb-close inline-block width: 50px"></i>',
            title: ' editar '
          },
          {
            name: 'Eliminar',
            title: ' eliminar '
          },
          {
            name: 'Pdf',
            title: ' visualizar '
          }
        ],
      },
      selectedRowIndex: -1,
      noDataMessage: 'No hay plantillas a revisar',
      pager: {
        display: true,
        perPage: 4,
      }
    };
  }

  consultarPlantillas(): any {

    const array = [];
    array[0] = {
      contenido: "<html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Titulo Seccion</title></head><body><p>Este es un párrafo de texto.</p></body></html>",
      descripcion: "Plantilla para documentos tipo 1 - Acta de inicio",
      enlaceDoc: "",
      fechaCreacion: "2023-12-19 17:05:41.137000",
      fechaModificacion: "2023-12-19 17:05:41.137000",
      nombre: "Plantilla de prueba",
      responsable: "Pruebasoas",
      tipo: "Acta de inicio",
      version: 1,
      versionActual: true,
      _id: "6581cd65365a47f73d07780a"
    };

    this.dataPlantillas = new LocalDataSource(array);

    // if (this.ejecutado === false) {
    //   try {
    //     this.request.get(environment.PLANTILLAS_SERVICE, 'plantilla').subscribe((res) => {
    //       console.log(res.data);
    //       this.dataPlantillas = new LocalDataSource(array);
    //       console.log(this.dataPlantillas);
    //     });
    //   } catch (error) {
    //     console.error("Error: ", error);
    //   }
    // }
    // this.ejecutado = true;
  }

  plantillaSeleccionada(event): void {
    console.log(event);
  }

  Acciones(event): void {
    switch (event.action) {
      case "Editar": {
        this.router.navigate(['pages/creacion_plantilla', event.data._id]);
        break;
      }
      case "Eliminar": {
        console.log("Eliminar");
        break;
      }
      case "Pdf": {
        const val = this.dataEmit.value;
        this.seccionesVista = val.secciones;
        this.generarPdf();
        break;
      }
    }
  }

  generarPdf() {
    // const data = document.createElement('div');
    // data.innerHTML = this.elementoForm.nativeElement.innerHTML;
    // data.style.marginTop = '50px';
    // document.body.appendChild(data);
    // const alturaForm = this.elementoForm.nativeElement.offsetHeight;
    // console.log(this.elementoForm.nativeElement.offsetHeight);
    // const data1 = this.elementoForm.nativeElement;
    // var elementHeight = this.elementoForm.nativeElement.offsetHeight;

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

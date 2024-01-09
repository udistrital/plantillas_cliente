import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RequestManager } from '../services/requestManager';
import { UtilService } from '../services/utilService';
import { UserService } from '../services/userService';
import { TablaPlantilla } from 'app/@core/models/tablaPlantilla';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-plantillas',
  templateUrl: './vista-plantillas.component.html',
  styleUrls: ['./vista-plantillas.component.scss'],
})
export class VistaPlantillasComponent implements OnInit {

  plantillasSettings: any;
  ejecutado: boolean = false;

  dataPlantillas: LocalDataSource;

  constructor(
    private request: RequestManager,
    private router: Router,
    private popUp: UtilService,
    private userService: UserService
  ) {
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
        position: 'right',
        columnTitle: 'Acciones',
        custom: [
          {
            name: 'Editar',
            icon: 'fas fa-check',
            template: '',
            title: 'Editar'
          },
          {
            name: 'Eliminar',
            title: 'Eliminar'
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

  Acciones(event): void {
    switch (event.action) {
      case "Editar": {
        console.log("Editar");
        console.log(event.data);
        this.router.navigate(['pages/creacion_plantilla', "123"]);
        break;
      }
      case "Eliminar": {
        console.log("Eliminar");
        break;
      }
      case "Rechazar": {
        break;
      }
    }
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

}

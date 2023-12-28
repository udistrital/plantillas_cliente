import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { RequestManager } from '../services/requestManager';
import { UtilService } from '../services/utilService';
import { UserService } from '../services/userService';
import { TablaPlantilla } from 'app/@core/models/tablaPlantilla';
import { environment } from 'environments/environment';


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
            name: 'Aprobar',
            icon: 'fas fa-check',
            template: '<em title="Rechazar" class="rechazar"><button mat-button type="button">    <i class="fas fa-times"></i></button></em>',
            title: ''
          },
          {
            name: 'Rechazar',
            title: ''
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
      case "Aprobar": {
        break;
      }
      case "Rechazar": {
        break;
      }
    }
  }

  consultarPlantillas(): any {
    if (this.ejecutado === false) {
      try {
        this.request.get(environment.PLANTILLAS_MID_SERVICE, 'plantilla').subscribe((res) => {
          this.dataPlantillas = new LocalDataSource(res.Data);
          console.log(this.dataPlantillas);
        });
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    this.ejecutado = true;
  }

  plantillaSeleccionada(event): void {
    console.log(event);
  }

}

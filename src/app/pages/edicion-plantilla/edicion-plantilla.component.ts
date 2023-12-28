import { Component, OnInit } from '@angular/core';
import { Plantilla } from 'app/@core/models/plantilla';
import { Respuesta } from 'app/@core/models/respuesta';

@Component({
  selector: 'app-edicion-plantilla',
  templateUrl: './edicion-plantilla.component.html',
  styleUrls: ['./edicion-plantilla.component.scss']
})
export class EdicionPlantillaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  actualizarPlantilla(): void {

    // const plantillaPost: Plantilla = {
    //   Id: 0,
    //   Tipo: this.tipo,
    //   Nombre: this.nombre,
    //   Descripcion: this.descripcion,
    //   Contenido: this.contenido,
    //   EnlaceDoc: this.enlace,
    //   Version: 0,
    //   versionActual: this.versionActual,
    //   FechaCreacion: '',
    //   FechaModificacion: '',
    //   Activo: true
    // };

    // this.request.put(
    //   environment.PLANTILLAS_MID_SERVICE, 'plantilla', plantillaPost).subscribe({
    //     next: (response: Respuesta) => {
    //       if (response.Success) {
    //         this.popUp.close();
    //         if (response.Data == null || (response.Data as any).length === 0) {
    //           this.popUp.warning('Ha ocurrido un error al crear la plantilla');
    //         } else {
    //           this.popUp.success('La plantilla se ha creado correctamente');
    //         }
    //       }
    //     }, error: () => {
    //       this.popUp.close();
    //       this.popUp.error("No existen peticiones asociadas al coordinador.");
    //     }
    //   });
  }

}

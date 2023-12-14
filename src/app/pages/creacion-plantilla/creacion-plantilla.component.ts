import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { RequestManager } from '../services/requestManager';
import { UtilService } from '../services/utilService';
import { UserService } from '../services/userService';

const pdf = new jsPDF();

@Component({
  selector: 'app-creacion-plantilla',
  templateUrl: './creacion-plantilla.component.html',
  styleUrls: ['./creacion-plantilla.component.scss']
})
export class CreacionPlantillaComponent implements OnInit {

  nombre: string;
  tipo: string[];

  constructor(
    private request: RequestManager,
    private popUp: UtilService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log("La están hippiando");
  }

  calcular(): void {
    console.log("Nombre: ", this.nombre);
    console.log("Tipo: ", this.tipo);

    const html = `
      <h1>Este es un documento HTML</h1>
      <p>El nombre es ${this.nombre}</p>
      <p>El tipo de la plantilla es ${this.tipo}</p>
    `;

    const pdf = new jsPDF();
    pdf.html(html, {
      callback: () => {
        pdf.save('descarga(0).pdf');
      }
    });
  }

}

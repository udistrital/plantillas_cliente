import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
import { UserService } from './services/userService';
import { RequestManager } from './services/requestManager';
@Component({
  selector: 'app-pages',
  template: `<div *ngIf="loaded" class="main-container">
              <div class="username-info">Bienvenido <br>{{Name}}</div>
              <router-outlet></router-outlet>
            </div>`,
})
export class PagesComponent implements OnInit {
  loaded = false;
  userData: any;
  environment: any;
  loadingRouter: boolean;
  Name: string = '';


  constructor(
    private router: Router,
    private userService: UserService,
    private request: RequestManager,
  ) {
    this.environment = environment;
    console.log("Eu");
    router.events.subscribe((event) => {
      if (event instanceof RouteConfigLoadStart) {
        Swal.fire({
          title: 'Cargando módulo ...',
          html: `Por favor espere`,
          showConfirmButton: false,
          allowOutsideClick: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });
        this.loadingRouter = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouter = false;
        Swal.close();
      } else {
        Swal.close();
      }
    });
  }

  ngOnInit(): void {
    console.log("Void");
    this.loaded = true;

    this.userService.user$.subscribe((data: any) => {
      const hasDocumento = data?.userService?.documento;
      if (hasDocumento) {
        this.request.get(environment.ADMINISTRATIVA_AMAZON_SERVICE, `informacion_proveedor?query=NumDocumento:` + data.userService.documento)
          .subscribe((datosIdentificacion: any) => {
            let Nombre = datosIdentificacion[0].NomProveedor;
            this.Name = Nombre;
          });
      }
    });

  }
}
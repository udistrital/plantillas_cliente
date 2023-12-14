import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { VistaPlantillasComponent } from './vista-plantillas/vista-plantillas.component';
import { CreacionPlantillaComponent } from './creacion-plantilla/creacion-plantilla.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '', redirectTo: 'dashboard', pathMatch: 'full',
    },
    {
      path: 'vista_plantillas',
      component: VistaPlantillasComponent,
    },
    {
      path: 'creacion_plantilla',
      component: CreacionPlantillaComponent,
    }
  ]

}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

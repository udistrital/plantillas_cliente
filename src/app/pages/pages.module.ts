import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatNativeDateModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InterceptorService } from '../loader/interceptor.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CreacionPlantillaComponent } from './creacion-plantilla/creacion-plantilla.component';
import { VistaPlantillasComponent } from './vista-plantillas/vista-plantillas.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormSeccionesComponent } from './creacion-plantilla/form-secciones/form-secciones.component';


const pagesComponents = [
  DashboardComponent,
  PagesComponent,
];

const materialModules = [
  MatCardModule,
  // MatListModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  // MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatGridListModule,
  // MatExpansionModule,
  MatButtonModule,
  // MatStepperModule,
  MatRadioModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
];
@NgModule({
  declarations: [
    ...pagesComponents,
    VistaPlantillasComponent,
    CreacionPlantillaComponent,
    FormSeccionesComponent,
  ],
  imports: [
    ...materialModules,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    MatDialogModule,
    Ng2SmartTableModule,
  ],
  providers: [
    MatDatepickerModule,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class PagesModule { }
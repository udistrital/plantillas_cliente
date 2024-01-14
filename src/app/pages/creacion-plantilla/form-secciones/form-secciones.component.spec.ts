import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSeccionesComponent } from './form-secciones.component';

describe('FormSeccionesComponent', () => {
  let component: FormSeccionesComponent;
  let fixture: ComponentFixture<FormSeccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSeccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

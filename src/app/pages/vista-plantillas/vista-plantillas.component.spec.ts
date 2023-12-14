import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPlantillasComponent } from './vista-plantillas.component';

describe('VistaPlantillasComponent', () => {
  let component: VistaPlantillasComponent;
  let fixture: ComponentFixture<VistaPlantillasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaPlantillasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPlantillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

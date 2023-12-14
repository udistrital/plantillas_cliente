import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionPlantillaComponent } from './creacion-plantilla.component';

describe('CreacionPlantillaComponent', () => {
  let component: CreacionPlantillaComponent;
  let fixture: ComponentFixture<CreacionPlantillaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreacionPlantillaComponent]
    });
    fixture = TestBed.createComponent(CreacionPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

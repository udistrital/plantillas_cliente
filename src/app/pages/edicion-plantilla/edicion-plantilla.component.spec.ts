import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionPlantillaComponent } from './edicion-plantilla.component';

describe('EdicionPlantillaComponent', () => {
  let component: EdicionPlantillaComponent;
  let fixture: ComponentFixture<EdicionPlantillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicionPlantillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicionPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

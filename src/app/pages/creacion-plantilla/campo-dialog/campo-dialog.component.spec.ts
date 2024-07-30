import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoDialogComponent } from './campo-dialog.component';

describe('CampoDialogComponent', () => {
  let component: CampoDialogComponent;
  let fixture: ComponentFixture<CampoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

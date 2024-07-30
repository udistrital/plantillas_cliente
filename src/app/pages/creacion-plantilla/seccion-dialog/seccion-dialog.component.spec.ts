import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionDialogComponent } from './seccion-dialog.component';

describe('SeccionDialogComponent', () => {
  let component: SeccionDialogComponent;
  let fixture: ComponentFixture<SeccionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

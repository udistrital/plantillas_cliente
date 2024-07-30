import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-seccion-dialog',
  templateUrl: './seccion-dialog.component.html',
  styleUrls: ['./seccion-dialog.component.scss']
})
export class SeccionDialogComponent implements OnInit {

  formGroup: FormGroup

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SeccionDialogComponent>
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      direccion: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

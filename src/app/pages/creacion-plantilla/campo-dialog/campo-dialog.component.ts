import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-campo-dialog',
  templateUrl: './campo-dialog.component.html',
  styleUrls: ['./campo-dialog.component.scss']
})
export class CampoDialogComponent implements OnInit {

  formGroup: FormGroup

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CampoDialogComponent>
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nombre: ['Campo seccion ', Validators.required],
      dataString: '',
      dataBinary: '',
      estiloFuente: 'Arial',
      tamanoFuente: 16,
      negrita: 'normal',
      cursiva: 'normal',
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

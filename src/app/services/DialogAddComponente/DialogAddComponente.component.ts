import { Component, Inject, OnInit, Optional, ElementRef  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-DialogAddComponente',
  templateUrl: './DialogAddComponente.component.html',
  styleUrls: ['./DialogAddComponente.component.css']
})
export class DialogAddComponenteComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddComponenteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any,
  ) { }

  submitted: boolean = false
  selectedImage: any
  imagePreview: any
  imageError: any
  allowedTypes = ['image/png', 'image/jpeg'];

  componenteForm = this.formBuilder.group(
    {
      Nome: ['', Validators.required],
      Descrizione: ['', Validators.required],
      Codice: ['', Validators.required],
      Qty: ['', Validators.required],
      Prezzo: ['', Validators.required]
    });

  get f2() {
    return this.componenteForm.controls;
  }

  ngOnInit() {
  }

  addComponente(){
    this.submitted = true

    if (this.componenteForm.valid && this.componenteForm.controls && this.selectedImage != null && !this.imageError) {
      this.dialogRef.close({ event: 'close', data: [this.componenteForm, this.selectedImage] });
    }
  }

  takeImage(event: any) {

    this.selectedImage = event.target.files[0];

    if (this.allowedTypes.includes(this.selectedImage.type)) {
      this.imagePreview = URL.createObjectURL(this.selectedImage);
      this.imageError = false;
    } else {
      this.imageError = true;
    }
  }

}

import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-DialogAddFornitura',
  templateUrl: './DialogAddFornitura.component.html',
  styleUrls: ['./DialogAddFornitura.component.css']
})
export class DialogAddFornituraComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddFornituraComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any,
  ) { }

  submitted: boolean = false

  componenteForm = this.formBuilder.group(
    {
      Id: [this.mydata.Id, Validators.required],
      Nome: [this.mydata.Nome, Validators.required],
      Descrizione: [this.mydata.Descrizione, Validators.required],
      Codice: [this.mydata.Codice, Validators.required],
      Qty: ['', Validators.required],
      Prezzo: [this.mydata.Prezzo, Validators.required],
    });

  get f2() {
    return this.componenteForm.controls;
  }

  ngOnInit() {
    //console.log('myData: ', this.mydata)
  }

  updateComponente(){
    this.submitted = true

    if (this.componenteForm.valid && this.componenteForm.controls) {
      this.dialogRef.close({ event: 'close', data: this.componenteForm });
    }
  }

}

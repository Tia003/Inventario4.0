import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-DialogConfirm',
  templateUrl: './DialogConfirm.component.html',
  styleUrls: ['./DialogConfirm.component.css']
})
export class DialogConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any,
  ) { }

  ngOnInit() {
  }

}

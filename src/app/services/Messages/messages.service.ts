import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string,
    isError: boolean = true,
    horizontalPosition: MatSnackBarHorizontalPosition = 'end',
    verticalPosition: MatSnackBarVerticalPosition = 'bottom',
    duration: number = 5000) {
    this.snackBar.open(message, '', {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      panelClass: [isError ? 'snackClassError' : 'snackClassSuccess'],
      duration: duration,
    });
  }
}

import { Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})

export class SnackBarService {

  constructor(
    private snackBar: MatSnackBar    ) { }
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
   showSuccess(msg:string) {
     this.showNotification(
       'snackbar-success',
       msg,
       'top',
       'right'
     );}

  showError(msg:string) {
   this.showNotification(
  'snackbar-danger',
  msg,
  'top',
  'right'
);
  }

  showInfo(msg:string) {
    this.showNotification(
      'black',
      msg,
      'bottom',
      'center'
    );
  }

  //showWarn(msg:string) {
    //this.toast.warning({detail:"WARN",summary:msg,duration:5000,position : "botomCenter"});}


}

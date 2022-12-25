import { Injectable } from '@angular/core';
// import { AngularFirestoreCollection } from '@angular/fire/firestore';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
// import { CustomDialogConfig } from './components/alert-dialog/alert-dialog-config.interface';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
// import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  dialogAction: string = 'Ok';
  loadSpinner = false;

  constructor(
    private snackbarComponent: SnackbarComponent,
    private dialog: MatDialog
  ) {}

  openSnackBar(message: string, buttonName: string = 'Ok') {
    this.snackbarComponent.openSnackBar(message, buttonName);
  }

  randomString(length: number) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }

  // private _getDefaultCustomDialogConfig(
  //   dialogType?: 'alert' | 'confirm'
  // ): CustomDialogConfig {
  //   return {
  //     dialogTitle: dialogType === 'alert' ? 'Alert' : 'Confirm',
  //     dialogType: dialogType ? dialogType : 'alert',
  //   };
  // }

  // openAlertDialog(title: string, message: string, action: string = 'Ok') {
  //   const dialogRef = this.dialog.open(AlertDialogComponent, {
  //     data: {
  //       action: action,
  //       title: title,
  //       message: message,
  //     },
  //   });
  //   return dialogRef.afterClosed();
  // }
}

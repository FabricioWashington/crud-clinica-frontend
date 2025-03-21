import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _snackBar: MatSnackBar, private location: Location) {}

  showError(message: string, action: string = 'Fechar', duration: number = 3000): void {
    this._snackBar.open(message, action, { duration, panelClass: ['error-snackbar'] });
  }

  showSuccess(message: string, action: string = 'Fechar', duration: number = 3000): void {
    this._snackBar.open(message, action, { duration, panelClass: ['success-snackbar'] });
  }

  showMessage(message: string, action: string = 'Fechar', duration: number = 3000): void {
    this._snackBar.open(message, action, { duration, panelClass: ['info-snackbar'] });
  }
}

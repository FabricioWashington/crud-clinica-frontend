import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { LoadingComponent } from './components/loading/loading.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog/success-dialog.component';
import { MatIconModule } from '@angular/material/icon';





@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    LoadingComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,

  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    MatDialogModule,
    MatIconModule
  ],
  exports: [LoadingComponent, ErrorDialogComponent]
})
export class SharedModule { }

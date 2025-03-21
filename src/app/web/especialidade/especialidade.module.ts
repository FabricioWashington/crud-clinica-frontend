import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialidadeRoutingModule } from './especialidade-routing.module';
import { EspecialidadeComponent } from './especialidade/especialidade.component';
import { ModalFormEspecialidadeComponent } from './modal/modal-form-especialidade/modal-form-especialidade.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EspecialidadeComponent,
    ModalFormEspecialidadeComponent
  ],
  imports: [
    CommonModule,
    EspecialidadeRoutingModule,
    AppMaterialModule,
    SharedModule
  ],
  exports: [
    EspecialidadeComponent
  ]
})
export class EspecialidadeModule { }

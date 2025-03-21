import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicoRoutingModule } from './medico-routing.module';
import { MedicoComponent } from './medico/medico.component';
import { ModalFormMedicoComponent } from './modal/modal-form-medico/modal-form-medico.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';


@NgModule({
  declarations: [
    MedicoComponent,
    ModalFormMedicoComponent
  ],
  imports: [
    CommonModule,
    MedicoRoutingModule,
    AppMaterialModule
  ],
  exports: [
    MedicoComponent
  ]
})
export class MedicoModule { }

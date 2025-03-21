import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './paciente/paciente.component';
import { ModalFormPacienteComponent } from './modal/modal-form-paciente/modal-form-paciente.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';


@NgModule({
  declarations: [
    PacienteComponent,
    ModalFormPacienteComponent
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    AppMaterialModule
  ],
  exports: [
    PacienteComponent
  ]
})
export class PacienteModule { }

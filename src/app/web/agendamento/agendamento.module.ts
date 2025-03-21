import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendamentoRoutingModule } from './agendamento-routing.module';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { ModalFormAgendamentoComponent } from './modal/modal-form-agendamento/modal-form-agendamento.component';
import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';


@NgModule({
  declarations: [
    AgendamentoComponent,
    ModalFormAgendamentoComponent,
  ],
  imports: [
    CommonModule,
    AgendamentoRoutingModule,
    AppMaterialModule,
    SharedModule
  ],
  exports: [
    AgendamentoComponent
  ]
})
export class AgendamentoModule { }

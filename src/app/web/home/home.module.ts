import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { AgendamentoModule } from '../agendamento/agendamento.module';
import { MedicoModule } from '../medico/medico.module';
import { PacienteModule } from '../paciente/paciente.module';
import { EspecialidadeModule } from '../especialidade/especialidade.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppMaterialModule,
    SharedModule,
    AgendamentoModule,
    MedicoModule,
    PacienteModule,
    EspecialidadeModule

]
})
export class HomeModule { }

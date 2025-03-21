import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./web/home/home.module').then(m => m.HomeModule) },
  { path: 'agendamento/view', loadChildren: () => import('./web/agendamento/agendamento.module').then(m => m.AgendamentoModule) },
  { path: 'pacientes/view', loadChildren: () => import('./web/paciente/paciente.module').then(m => m.PacienteModule) },
  { path: 'medicos/view', loadChildren: () => import('./web/medico/medico.module').then(m => m.MedicoModule) },
  { path: 'especialidade/view', loadChildren: () => import('./web/especialidade/especialidade.module').then(m => m.EspecialidadeModule) },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

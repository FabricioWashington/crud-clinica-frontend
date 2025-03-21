import { Component, OnInit } from '@angular/core';
import { EspecialidadeService } from '../../services/especialidade.service';
import { MedicoService } from '../../services/medico.service';
import { AgendamentoService } from '../../services/agendamento.service';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  componenteAtual: string = 'agendamento';
  totalEspecialidades: number = 0;
  totalAgendamentos: number = 0;
  totalMedicos: number = 0;
  totalPacientes: number = 0;

  constructor
  (
    private especialidadeService: EspecialidadeService,
    private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private agendamentoService: AgendamentoService

  ) {}

  ngOnInit(): void{
    this.loadTotalEspecialidades();
    this.loadTotalMedicos();
    this.loadTotalPacientes();
    this.loadTotalAgendamentos();
  }

  mostrarComponente(nome: string): void {
    this.componenteAtual = nome;
  }

  //// loads

  loadTotalEspecialidades(){
    this.especialidadeService.contarTodas().subscribe(total => {
      this.totalEspecialidades = total;
    });
  }

  loadTotalMedicos(){
    this.medicoService.contarTodas().subscribe(total => {
      this.totalMedicos = total;
    });
  }

  loadTotalPacientes(){
    this.pacienteService.contarTodas().subscribe(total => {
      this.totalPacientes = total;
    });
  }

  loadTotalAgendamentos(){
    this.agendamentoService.contarTodas().subscribe(total => {
      this.totalAgendamentos = total;
    });
  }

}

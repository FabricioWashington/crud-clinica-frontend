import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../interfaces/paciente';
import { Medico } from '../../interfaces/medico';
import { ModalFormAgendamentoComponent } from '../modal/modal-form-agendamento/modal-form-agendamento.component';
import { MatDialog } from '@angular/material/dialog';
import { AgendamentoService } from '../../services/agendamento.service';
import { Consulta } from '../../interfaces/consulta';
import { MedicoService } from '../../services/medico.service';
import { PacienteService } from '../../services/paciente.service';
import { MessageService } from '../../shared/utils/message/message.service';

@Component({
  selector: 'app-agendamento',
  standalone: false,
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.scss'
})
export class AgendamentoComponent implements OnInit {
  public data: any[] = [];
  public isLoading = true;
  public consultas: Consulta[] = [];
  public pacientes: Paciente[] = [];
  public medicos: Medico[] = [];

  constructor(
    private dialog: MatDialog,
    public agendamentoService: AgendamentoService,
    public medicoService: MedicoService,
    public pacienteService: PacienteService,
    public messageService: MessageService

  ) {
  }

  ngOnInit(): void {
    this.loadAgendamentos();
    this.loadMedicos();
    this.loadPacientes();
  }

  openModal() {
    this.dialog.open(ModalFormAgendamentoComponent, {
      data: {
        pacientes: this.pacientes,
        medicos: this.medicos
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loadAgendamentos();
      }
    });
  }

  removeItem(id: number) {
    if (confirm('Tem certeza que deseja remover este paciente?')) {
      this.agendamentoService.cancelar(id).subscribe({
        next: (response) => {
          this.loadAgendamentos();
          this.messageService.showSuccess('Consulta removida com sucesso!', 'Fechar');
        }
      });
    }
  }

  editItem(consulta: Consulta) {
    this.dialog.open(ModalFormAgendamentoComponent, {
          data: {
            consulta,
            pacientes: this.pacientes,
            medicos: this.medicos
          }
        }).afterClosed().subscribe(result => {
          if (result) {
            this.loadAgendamentos();
          }
        });
  }

  loading() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }


  //// loads

  loadAgendamentos() {
    this.loading();
    this.agendamentoService.listarTodas().subscribe({
      next: (response) => {
        this.consultas = response;
      },
      error: (error) => {
        console.error('Erro ao carregar agendamentos:', error);
        this.isLoading = false;
      }
    });
  }

  loadMedicos() {
    this.medicoService.listarTodos().subscribe({
      next: (response) => {
        this.medicos = response;
      }
    });
  }

  loadPacientes() {
    this.pacienteService.listarTodos().subscribe({
      next: (response) => {
        console.log(response);
        this.pacientes = response;
      }
    });
  }

}

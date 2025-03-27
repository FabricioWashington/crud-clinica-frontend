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
import { ConfirmDialogComponent } from '../../shared/utils/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { FormattingService } from '../../shared/utils/formatting/formatting.service';
import { Especialidade } from '../../interfaces/especialidade';
import { EspecialidadeService } from '../../services/especialidade.service';

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
  public especialidades: Especialidade[] = [];
  public consultasFiltradas: Consulta[] = [];

  // filtro avançado
  public exibirFiltroAvancado = false;
  public filtroSelecionado = 'todos';
  public filtroSelecionadoLabel = 'Todos';
  public valorBusca = '';
  public opcoesFiltro = [
    { valor: 'todos', label: 'Todos' },
    { valor: 'cpf', label: 'CPF do Paciente' },
  ];

  public filtro = {
    nomePaciente: '',
    cpf: '',
    nomeMedico: '',
    especialidade: '',
    data: '',
    status: ''
  };

  constructor(
    private dialog: MatDialog,
    public agendamentoService: AgendamentoService,
    public medicoService: MedicoService,
    public pacienteService: PacienteService,
    public messageService: MessageService,
    public formatting: FormattingService,
    public especialidadeService: EspecialidadeService
  ) {
  }

  ngOnInit(): void {
    this.loadAgendamentos();
    this.loadMedicos();
    this.loadPacientes();
    this.loadEspecialidades();
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        titulo: 'Cancelar Consulta',
        mensagem: 'Tem certeza que deseja remover esta consulta?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.agendamentoService.cancelar(id).subscribe({
          next: () => {
            this.loadAgendamentos();
            this.messageService.showSuccess('Consulta removida com sucesso!', 'Fechar');
          }
        });
      }
    });
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

  selecionarFiltro(opcao: any) {
    this.filtroSelecionado = opcao.valor;
    this.filtroSelecionadoLabel = opcao.label;
  }

  pesquisarDireto() {
    const valor = this.valorBusca.toLowerCase().trim();

    this.consultasFiltradas = this.consultas.filter(c => {
      const nomePaciente = c.paciente?.nome?.toLowerCase() || '';
      const cpfPaciente = c.paciente?.cpf?.replace(/\D/g, '') || '';
      const nomeMedico = c.medico?.nome?.toLowerCase() || '';
      const especialidade = c.medico?.especialidade?.toLowerCase() || '';

      if (this.filtroSelecionado === 'paciente') {
        return nomePaciente.includes(valor);
      } else if (this.filtroSelecionado === 'cpf') {
        return cpfPaciente.includes(valor.replace(/\D/g, ''));
      } else if (this.filtroSelecionado === 'medico') {
        return nomeMedico.includes(valor);
      } else if (this.filtroSelecionado === 'especialidade') {
        return especialidade.includes(valor);
      } else {
        return (
          nomePaciente.includes(valor) ||
          cpfPaciente.includes(valor.replace(/\D/g, '')) ||
          nomeMedico.includes(valor) ||
          especialidade.includes(valor)
        );
      }
    });
  }

  limparFiltros() {
    this.filtro = {
      nomePaciente: '',
      cpf: '',
      nomeMedico: '',
      especialidade: '',
      data: '',
      status: ''
    };
    this.valorBusca = '';
    this.filtroSelecionado = 'todos';
    this.filtroSelecionadoLabel = 'Todos';
    this.consultasFiltradas = [...this.consultas];
  }

  filtrar() {
    this.consultasFiltradas = this.consultas.filter(c => {
      const nomePaciente = c.paciente?.nome?.toLowerCase() || '';
      const cpfPaciente = c.paciente?.cpf?.replace(/\D/g, '') || '';
      const nomeMedico = c.medico?.nome?.toLowerCase() || '';
      const especialidade = c.medico?.especialidade?.toLowerCase() || '';
      const dataConsulta = c.dataConsulta
      const status = c.status || '';

      const filtroDataFormatada = this.filtro.data
        ? this.formatting.formatInputDateTimeToBr(this.filtro.data)
        : '';

      console.log('Filtro:', filtroDataFormatada);
      console.log('Consulta:', dataConsulta);

      return (
        nomePaciente.includes(this.filtro.nomePaciente?.toLowerCase() || '') &&
        cpfPaciente.includes(this.filtro.cpf?.replace(/\D/g, '') || '') &&
        nomeMedico.includes(this.filtro.nomeMedico?.toLowerCase() || '') &&
        especialidade.includes(this.filtro.especialidade?.toLowerCase() || '') &&
        (filtroDataFormatada === '' || this.formatting.formatDateTimeBr(dataConsulta) === filtroDataFormatada) &&

        (!this.filtro.status || status === this.filtro.status)
      );
    });
  }

  //// loads

  loadAgendamentos() {
    this.loading();
    this.agendamentoService.listarTodas().subscribe({
      next: (response) => {
        this.consultas = response;
        this.consultasFiltradas = response;
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
        this.pacientes = response;
      }
    });
  }

  loadEspecialidades() {
    this.especialidadeService.listarTodas().subscribe({
      next: (response) => {
        this.especialidades = response;
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../interfaces/paciente';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormPacienteComponent } from '../modal/modal-form-paciente/modal-form-paciente.component';
import { PacienteService } from '../../services/paciente.service';
import { MessageService } from '../../shared/utils/message/message.service';
import { ConfirmDialogComponent } from '../../shared/utils/confirm-dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-paciente',
  standalone: false,
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.scss'
})
export class PacienteComponent implements OnInit {
  public isLoading = true;
  public pacientes: Paciente[] = [];
  public pacientesFiltrados: Paciente[] = [];

  // filtro avançado
  public exibirFiltroAvancado = false;
  public filtroSelecionado = 'todos';
  public filtroSelecionadoLabel = 'Todos';
  public valorBusca = '';
  public opcoesFiltro = [
    { valor: 'todos', label: 'Todos' },
    { valor: 'nome', label: 'Nome' },
    { valor: 'cpf', label: 'Cpf' },
    { valor: 'email', label: 'E-mail' },
  ];

  public filtro = {
    paciente: '',
    nome: '',
    cpf: '',
    email: ''
  };

  constructor(
    private dialog: MatDialog,
    private pacienteService: PacienteService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.loadPacientes();
  }

  openModal() {
    this.dialog.open(ModalFormPacienteComponent, {
      data: {
        pacientes: this.pacientes,
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loadPacientes();
      }
    });

  }

  removeItem(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        titulo: 'Remover Paciente',
        mensagem: 'Tem certeza que deseja remover este paciente?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pacienteService.deletar(id).subscribe({
          next: () => {
            this.loadPacientes();
            this.messageService.showSuccess('Paciente removido com sucesso!', 'Fechar');
          }
        });
      }
    });
  }

  editItem(paciente: Paciente) {
    this.dialog.open(ModalFormPacienteComponent, {
      data: {
        paciente,
        pacientes: this.pacientes
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loadPacientes();
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

    this.pacientesFiltrados = this.pacientes.filter(c => {
      const nome = c.nome?.toLowerCase() || '';
      const cpf = c.cpf?.replace(/\D/g, '') || '';
      const email = c.email?.toLowerCase() || '';

      if (this.filtroSelecionado === 'nome') {
        return nome.includes(valor);
      } else if (this.filtroSelecionado === 'cpf') {
        return cpf.includes(valor.replace(/\D/g, ''));
      } else if (this.filtroSelecionado === 'email') {
        return email.includes(valor);
      } else {
        return (
          nome.includes(valor) ||
          cpf.includes(valor.replace(/\D/g, '')) ||
          email.includes(valor)
        );
      }
    });
  }

  limparFiltros() {
    this.filtro = {
      paciente: '',
      nome: '',
      cpf: '',
      email: ''
    };
    this.valorBusca = '';
    this.filtroSelecionado = 'todos';
    this.filtroSelecionadoLabel = 'Todos';
    this.pacientesFiltrados = [...this.pacientes];
  }

  filtrar() {
    this.pacientesFiltrados = this.pacientes.filter(c => {
      const nome = c.nome?.toLowerCase() || '';
      const cpf = c.cpf?.replace(/\D/g, '') || '';
      const email = c.email?.toLowerCase() || '';

      return (
        nome.includes(this.filtro.nome.toLowerCase()) &&
        cpf.includes(this.filtro.cpf.replace(/\D/g, '')) &&
        email.includes(this.filtro.email.toLowerCase())
      );
    });
  }

  //// loads

  loadPacientes() {
    this.loading();
    this.pacienteService.listarTodos().subscribe({
      next: (response) => {
        this.pacientes = response;
        this.pacientesFiltrados = response;
      }
    });
  }
}

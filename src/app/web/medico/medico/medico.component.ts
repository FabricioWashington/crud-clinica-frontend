import { Component } from '@angular/core';
import { Medico } from '../../interfaces/medico';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormMedicoComponent } from '../modal/modal-form-medico/modal-form-medico.component';
import { MedicoService } from '../../services/medico.service';
import { MessageService } from '../../shared/utils/message/message.service';
import { ConfirmDialogComponent } from '../../shared/utils/confirm-dialog/confirm-dialog/confirm-dialog.component';
import { EspecialidadeService } from '../../services/especialidade.service';
import { Especialidade } from '../../interfaces/especialidade';

@Component({
  selector: 'app-medico',
  standalone: false,
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.scss'
})
export class MedicoComponent {
  public isLoading = true;
  public medicos: Medico[] = [];
  public especialidades: Especialidade[] = [];
  public medicosFiltrados: Medico[] = [];

  // filtro avançado
  public exibirFiltroAvancado = false;
  public filtroSelecionado = 'todos';
  public filtroSelecionadoLabel = 'Todos';
  public valorBusca = '';
  public opcoesFiltro = [
    { valor: 'todos', label: 'Todos' },
    { valor: 'nome', label: 'Nome' },
  ];

  public filtro = {
    nome: '',
    especialidade: ''
  };

  constructor(
    private dialog: MatDialog,
    private medicoService: MedicoService,
    private messageService: MessageService,
    private especialidadeService: EspecialidadeService,
  ) {
    this.loadMedicos();
    this.loadEspecialidades();
  }

  openModal() {
    this.dialog.open(ModalFormMedicoComponent, {
      data: {
        medicos: this.medicos
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loadMedicos();
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
        this.medicoService.deletar(id).subscribe({
          next: () => {
            this.loadMedicos();
            this.messageService.showSuccess('Paciente removido com sucesso!', 'Fechar');
          }
        });
      }
    });
  }

  editItem(medico: Medico) {
    this.dialog.open(ModalFormMedicoComponent, {
      data: {
        medico,
        medicos: this.medicos
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loadMedicos();
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

    this.medicosFiltrados = this.medicos.filter(c => {
      const nome = c.nome?.toLowerCase() || '';
      const especialidade = c.especialidade?.toLowerCase() || '';

      if (this.filtroSelecionado === 'nome') {
        return nome.includes(valor);
      } else if (this.filtroSelecionado === 'especialidade') {
        return especialidade.includes(valor);
      } else {
        return (
          nome.includes(valor) ||
          especialidade.includes(valor)
        );
      }
    });
  }

  limparFiltros() {
    this.filtro = {
      nome: '',
      especialidade: '',
    };
    this.valorBusca = '';
    this.filtroSelecionado = 'todos';
    this.filtroSelecionadoLabel = 'Todos';
    this.medicosFiltrados = [...this.medicos];
  }

  filtrar() {
    this.medicosFiltrados = this.medicos.filter(medico => {
      const nome = medico.nome?.toLowerCase() || '';
      const especialidade = medico.especialidade?.toLowerCase() || '';

      return (
        nome.includes(this.filtro.nome.toLowerCase()) &&
        especialidade.includes(this.filtro.especialidade.toLowerCase())
      );
    });
  }


  ///// loads

  loadMedicos() {
    this.loading();
    this.medicoService.listarTodos().subscribe({
      next: (response) => {
        this.medicos = response;
        this.medicosFiltrados = response;
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

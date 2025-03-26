import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EspecialidadeService } from '../../services/especialidade.service';
import { MessageService } from '../../shared/utils/message/message.service';
import { ModalFormEspecialidadeComponent } from '../modal/modal-form-especialidade/modal-form-especialidade.component';
import { Especialidade } from '../../interfaces/especialidade';
import { ConfirmDialogComponent } from '../../shared/utils/confirm-dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-especialidade',
  standalone: false,
  templateUrl: './especialidade.component.html',
  styleUrl: './especialidade.component.scss'
})
export class EspecialidadeComponent implements OnInit {
  public data: any[] = [];
  public isLoading = true;
  public especialidades: Especialidade[] = [];
  public especialidadesFiltradas: Especialidade[] = [];

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
    nome: ''
  };

  constructor(
    private dialog: MatDialog,
    public especialidadeService: EspecialidadeService,
    public messageService: MessageService

  ) {
  }

  ngOnInit(): void {
    this.loadEspecialidade();
  }

  openModal() {
    this.dialog.open(ModalFormEspecialidadeComponent, {
      data: {
        especialidade: this.especialidades
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loadEspecialidade();
      }
    });
  }

  removeItem(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        titulo: 'Remover Especialidade',
        mensagem: 'Tem certeza que deseja remover esta especialidade?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.especialidadeService.deletar(id).subscribe({
          next: () => {
            this.loadEspecialidade();
            this.messageService.showSuccess('Especialidade removida com sucesso!', 'Fechar');
          }
        });
      }
    });
  }

  editItem(especialidade: Especialidade) {
    this.dialog.open(ModalFormEspecialidadeComponent, {
      data: {
        especialidade,
        especialidades: this.especialidades
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.loadEspecialidade();
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

    this.especialidadesFiltradas = this.especialidades.filter(c => {
      const nome = c.nome?.toLowerCase() || '';

      if (this.filtroSelecionado === 'nome') {
        return nome.includes(valor);
      } else {
        return (
          nome.includes(valor)
        );
      }
    });
  }

  limparFiltros() {
    this.filtro = {
      nome: ''
    };
    this.valorBusca = '';
    this.filtroSelecionado = 'todos';
    this.filtroSelecionadoLabel = 'Todos';
    this.especialidadesFiltradas = [...this.especialidades];
  }

  filtrar() {
    this.especialidadesFiltradas = this.especialidades.filter(c => {
      const especialidade = c.nome?.toLowerCase() || '';

      return (
        especialidade.includes(this.filtro.nome.toLowerCase())
      );
    });
  }


  //// loads

  loadEspecialidade() {
    this.loading();
    this.especialidadeService.listarTodas().subscribe({
      next: (response) => {
        this.especialidades = response;
        this.especialidadesFiltradas = response;
      },
      error: (error) => {
        console.error('Erro ao carregar Especialidades:', error);
        this.isLoading = false;
      }
    });
  }

}

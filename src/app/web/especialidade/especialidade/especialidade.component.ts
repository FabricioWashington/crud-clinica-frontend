import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EspecialidadeService } from '../../services/especialidade.service';
import { MessageService } from '../../shared/utils/message/message.service';
import { ModalFormEspecialidadeComponent } from '../modal/modal-form-especialidade/modal-form-especialidade.component';
import { Especialidade } from '../../interfaces/especialidade';

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
    if (confirm('Tem certeza que deseja remover esta especialidade?')) {
      this.especialidadeService.deletar(id).subscribe({
        next: (response) => {
          this.loadEspecialidade();
          this.messageService.showSuccess('Especialidade removida com sucesso!', 'Fechar');
        }
      });
    }
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


  //// loads

  loadEspecialidade() {
    this.loading();
    this.especialidadeService.listarTodas().subscribe({
      next: (response) => {
        this.especialidades = response;
      },
      error: (error) => {
        console.error('Erro ao carregar Especialidades:', error);
        this.isLoading = false;
      }
    });
  }

}

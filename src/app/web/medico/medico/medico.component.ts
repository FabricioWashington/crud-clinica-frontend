import { Component } from '@angular/core';
import { Medico } from '../../interfaces/medico';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormMedicoComponent } from '../modal/modal-form-medico/modal-form-medico.component';
import { MedicoService } from '../../services/medico.service';
import { MessageService } from '../../shared/utils/message/message.service';
import { ConfirmDialogComponent } from '../../shared/utils/confirm-dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-medico',
  standalone: false,
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.scss'
})
export class MedicoComponent {
  public isLoading = true;
  public medicos: Medico[] = [];


  constructor(
    private dialog: MatDialog,
    private medicoService: MedicoService,
    private messageService: MessageService
  ) {
    this.loadMedicos();
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

  ///// loads

  loadMedicos() {
    this.loading();
    this.medicoService.listarTodos().subscribe({
      next: (response) => {
        this.medicos = response;
      }
    });
  }
}

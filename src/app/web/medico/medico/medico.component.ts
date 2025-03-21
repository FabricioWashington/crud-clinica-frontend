import { Component } from '@angular/core';
import { Medico } from '../../interfaces/medico';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormMedicoComponent } from '../modal/modal-form-medico/modal-form-medico.component';
import { MedicoService } from '../../services/medico.service';
import { MessageService } from '../../shared/utils/message/message.service';

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
    if (confirm('Tem certeza que deseja remover este paciente?')) {
      this.medicoService.deletar(id).subscribe({
        next: (response) => {
          this.loadMedicos();
          this.messageService.showSuccess('Paciente removido com sucesso!', 'Fechar');
        }
      });
    }
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

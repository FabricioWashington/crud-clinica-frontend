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

  //// loads

  loadPacientes() {
    this.loading();
    this.pacienteService.listarTodos().subscribe({
      next: (response) => {
        this.pacientes = response;
      }
    });
  }
}

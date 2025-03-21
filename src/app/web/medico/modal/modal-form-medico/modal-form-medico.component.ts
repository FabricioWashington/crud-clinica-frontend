import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicoService } from '../../../services/medico.service';
import { MessageService } from '../../../shared/utils/message/message.service';
import { EspecialidadeService } from '../../../services/especialidade.service';
import { Especialidade } from '../../../interfaces/especialidade';

@Component({
  selector: 'app-modal-form-medico',
  standalone: false,
  templateUrl: './modal-form-medico.component.html',
  styleUrl: './modal-form-medico.component.scss'
})
export class ModalFormMedicoComponent implements OnInit {
  formData: any = {
    nome: '',
    especialidade: ''
  };

  public especialidades: Especialidade[] = [];

  constructor(
    private dialogRef: MatDialogRef<ModalFormMedicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public medicoService: MedicoService,
    private messageService: MessageService,
    private especialidadeService: EspecialidadeService

  ) {
    if (data?.medico) {
      this.formData = { ...data.medico };
    }
  }

  ngOnInit(): void {
    this.loadEspecialidade();
  }

  closeModal() {
    this.dialogRef.close();
  }

  submit() {
    if (this.formData.id) {
      this.medicoService.editar(this.formData.id, this.formData).subscribe({
        next: (response) => {
          this.messageService.showSuccess('Médico atualizado com sucesso!', 'Fechar');
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error(error);
          this.messageService.showError('Erro ao editar médico.', 'Fechar');
        }
      });
    } else {
      this.medicoService.cadastrar(this.formData).subscribe({
        next: (response) => {
          this.messageService.showSuccess('Médico cadastrado com sucesso!', 'Fechar');
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error(error);
          this.messageService.showError('Erro ao cadastrar médico.', 'Fechar');
        }
      });
    }
  }

  ///// loads

  loadEspecialidade(){
    this.especialidadeService.listarTodas().subscribe({
      next: (response) => {
        this.especialidades = response;
      }
    });
  }

}

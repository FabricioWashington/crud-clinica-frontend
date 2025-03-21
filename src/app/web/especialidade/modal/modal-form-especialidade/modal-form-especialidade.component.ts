import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EspecialidadeService } from '../../../services/especialidade.service';
import { MessageService } from '../../../shared/utils/message/message.service';

@Component({
  selector: 'app-modal-form-especialidade',
  standalone: false,
  templateUrl: './modal-form-especialidade.component.html',
  styleUrl: './modal-form-especialidade.component.scss'
})
export class ModalFormEspecialidadeComponent implements OnInit{
  formData: any = {
    id: null,
    nome: ''
  };

  constructor(
    public dialogRef: MatDialogRef<ModalFormEspecialidadeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public especialidadeService: EspecialidadeService,
    public messageService: MessageService,
  ) {
    if (data?.especialidade) {
      this.formData = {
        id: data.especialidade.id,
        nome: data.especialidade.nome,
      };
    }
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

  submit() {
    if (this.formData.id) {
      this.especialidadeService.editar(this.formData.id, this.formData).subscribe({
        next: (response) => {
          this.messageService.showSuccess('Consulta atualizada com sucesso!', 'Fechar');
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error(error);
          this.messageService.showError('Erro ao atualizar consulta.', 'Fechar');
        }
      });
    } else {
      this.especialidadeService.cadastrar(this.formData).subscribe({
        next: (response) => {
          this.messageService.showSuccess('Consulta agendada com sucesso!', 'Fechar');
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error(error);
          this.messageService.showError('Erro ao agendar consulta.', 'Fechar');
        }
      });
    }
  }


}

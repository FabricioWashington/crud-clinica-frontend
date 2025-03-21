import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormattingService } from '../../../shared/utils/formatting/formatting.service';
import { ValidationService } from '../../../shared/utils/validation/validation.service';
import { MessageService } from '../../../shared/utils/message/message.service';
import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-modal-form-paciente',
  standalone: false,
  templateUrl: './modal-form-paciente.component.html',
  styleUrl: './modal-form-paciente.component.scss'
})
export class ModalFormPacienteComponent implements OnInit {
  formData: any = {
    nome: '',
    cpf: '',
    email: ''
  };

  constructor(
    public dialogRef: MatDialogRef<ModalFormPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formattingService: FormattingService,
    public validationService: ValidationService,
    public messageService: MessageService,
    public pacienteService: PacienteService
  ) {
    if (data?.paciente) {
      this.formData = { ...data.paciente };
    }
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

  aplicarMascaraCPF(event: any): void {
    const input = event.target;
    input.value = this.formattingService.maskCPF(input.value);
  }

  submit() {
    if (!this.validationService.validateCPF(this.formData.cpf)) {
      this.messageService.showError('CPF inválido!', 'Fechar');
      return;
    }


    if (this.formData.id) {
      this.pacienteService.editar(this.formData.id, this.formData).subscribe({
        next: (response) => {
          this.messageService.showSuccess('Paciente atualizado com sucesso!', 'Fechar');
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error(error);
          this.messageService.showError('Erro ao editar paciente.', 'Fechar');
        }
      });
    } else {
      this.pacienteService.cadastrar(this.formData).subscribe({
        next: (response) => {
          this.messageService.showSuccess('Paciente cadastrado com sucesso!', 'Fechar');
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error(error);
          this.messageService.showError('Erro ao cadastrar paciente.', 'Fechar');
        }
      });
    }
  }
}

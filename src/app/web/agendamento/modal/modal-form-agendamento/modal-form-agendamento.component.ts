import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AgendamentoService } from '../../../services/agendamento.service';
import { MessageService } from '../../../shared/utils/message/message.service';
import { ConsultaRequestDTO } from '../../../interfaces/ConsultaRequestDTO';

@Component({
  selector: 'app-modal-form-agendamento',
  standalone: false,
  templateUrl: './modal-form-agendamento.component.html',
  styleUrl: './modal-form-agendamento.component.scss'
})
export class ModalFormAgendamentoComponent implements OnInit{
  formData: any = {
    paciente_id: null,
    medico_id: null,
    dataConsulta: '',
    status: ''
  };

  constructor(
    public dialogRef: MatDialogRef<ModalFormAgendamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public agendamentoService: AgendamentoService,
    public messageService: MessageService,
  ) {
    if (data?.consulta) {
      this.formData = {
        id: data.consulta.id,
        paciente_id: data.consulta.paciente.id,
        medico_id: data.consulta.medico.id,
        dataConsulta: data.consulta.dataConsulta,
        status: data.consulta.status
      };
    }
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

  submit() {
    const payload: ConsultaRequestDTO = {
      paciente: { id: this.formData.paciente_id },
      medico: { id: this.formData.medico_id },
      dataConsulta: this.formData.dataConsulta,
      status: this.formData.status
    };

    if (this.formData.id) {
      this.agendamentoService.editar(this.formData.id, payload).subscribe({
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
      this.agendamentoService.agendar(payload).subscribe({
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

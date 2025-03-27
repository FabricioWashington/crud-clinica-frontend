import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormattingService {
  constructor() {}

  formatCPF(cpf: string): string {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) return cpf;
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  maskCPF(value: string): string {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatInputDateTimeToBr(dateStr: string): string {
    if (!dateStr) return '';

    const [data, hora] = dateStr.split('T');
    const [ano, mes, dia] = data.split('-');

    return `${dia}/${mes}/${ano} ${hora || '00:00'}`;
  }

  formatDateTimeBr(date: string | Date): string {
    if (!date) return '';

    let d: Date;

    if (typeof date === 'string' && date.includes('/')) {
      const [dia, mes, anoHora] = date.split('/');
      const [ano, hora] = anoHora.split(' ');
      const [h, m] = (hora || '00:00').split(':');
      d = new Date(+ano, +mes - 1, +dia, +h, +m);
    } else {
      d = new Date(date);
    }

    const dia = d.getDate().toString().padStart(2, '0');
    const mes = (d.getMonth() + 1).toString().padStart(2, '0');
    const ano = d.getFullYear();
    const hora = d.getHours().toString().padStart(2, '0');
    const minuto = d.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
  }

}

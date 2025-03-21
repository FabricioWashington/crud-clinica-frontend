export interface ConsultaRequestDTO {
  paciente: { id: number };
  medico: { id: number };
  dataConsulta: Date | string;
  status: string;
}

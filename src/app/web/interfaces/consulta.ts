import { Medico } from "./medico";
import { Paciente } from "./paciente";

export interface Consulta {
  id: number;
  paciente_id: number;
  medico_id: number;
  dataConsulta: Date;
  status: string;

  paciente: Paciente;
  medico: Medico;
}

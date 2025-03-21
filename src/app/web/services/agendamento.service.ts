import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consulta } from '../interfaces/consulta';
import { environment } from '../../../../environment';
import { ConsultaRequestDTO } from '../interfaces/ConsultaRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private readonly apiUrl = `${environment.apiUrl}/consultas`;

  constructor(private http: HttpClient) { }

  listarTodas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Consulta> {
    return this.http.get<Consulta>(`${this.apiUrl}/${id}`);
  }

  agendar(consulta: ConsultaRequestDTO): Observable<Consulta> {
    return this.http.post<Consulta>(this.apiUrl, consulta);
  }

  editar(id: number, consulta: ConsultaRequestDTO): Observable<Consulta> {
    return this.http.put<Consulta>(`${this.apiUrl}/${id}`, consulta);
  }

  cancelar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  contarTodas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/totalConsultas`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especialidade } from '../interfaces/especialidade';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {

  private readonly apiUrl = `${environment.apiUrl}/especialidades`;

  constructor(private http: HttpClient) { }

  listarTodas(): Observable<Especialidade[]> {
    return this.http.get<Especialidade[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Especialidade> {
    return this.http.get<Especialidade>(`${this.apiUrl}/${id}`);
  }

  cadastrar(especialidade: Especialidade): Observable<Especialidade> {
    return this.http.post<Especialidade>(this.apiUrl, especialidade);
  }

  editar(id: number, especialidade: Especialidade): Observable<Especialidade> {
    return this.http.put<Especialidade>(`${this.apiUrl}/${id}`, especialidade);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  contarTodas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/totalEspecialidades`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from 'src/app/models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Project>> {
    return this.http.get<Array<Project>>(`${environment.API_URL}/projects`)
  }
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${environment.API_URL}/projects`, project);
  }
}

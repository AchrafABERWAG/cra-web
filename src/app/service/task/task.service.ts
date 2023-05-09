import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from 'src/app/models/task';
import {TaskCount} from "../../models/taskCount";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(`${environment.API_URL}/tasks`);
  }
  addTask(tasks: Array<Task>): Observable<Array<Task>>{
    return this.http.post<Array<Task>>(`${environment.API_URL}/tasks`,tasks);
}
  countNumberOfTaskByActivityAndProject(): Observable<Array<TaskCount>>{
    return this.http.get<Array<TaskCount>>(`${environment.API_URL}/tasks/count`);
  }
}


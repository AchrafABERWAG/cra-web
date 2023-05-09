import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Activity } from "../../models/activity";


@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Activity>> {
    return this.http.get<Array<Activity>>(`${environment.API_URL}/activities`);
  }
  addActivity(activity: Activity): Observable<Activity>{
        return this.http.post<Activity>(`${environment.API_URL}/activities`,activity) 
  }
}
  
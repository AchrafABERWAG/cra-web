import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public profileSource: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient) { }

    getAll(): Observable<Array<User>> {
      return this.http.get<Array<User>>(`${environment.API_URL}/users`);
    }

    addUser(user: User): Observable<User> {
      return this.http.post<User>(`${environment.API_URL}/users`, user);
    }

    me(): void {
      this.http.get<User>(`${environment.API_URL}/users/me`)
        .subscribe(user => {
          this.profileSource.next(user);
        });
    }
}

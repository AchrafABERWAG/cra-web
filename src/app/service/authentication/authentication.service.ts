import { Injectable } from '@angular/core';
import { Credentials } from '../../models/credentials';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { UserService } from "../user/user.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private jwtHelper: JwtHelperService;
  static TOKEN_KEY: string = 'token';

  constructor(
    private router: Router,
    private readonly http: HttpClient,
    private userService: UserService,
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  signInWithEmailAndPassword(credentials: Credentials): Observable<any> {
    let options: Object = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(`${credentials.email}:${credentials.password}`)
      }),
      responseType: 'text'
    };
    return this.http.post<any>(`${environment.API_URL}/token`, null, options);
  }

  saveTokenAndRedirect(token: string): void {
    localStorage.setItem(AuthenticationService.TOKEN_KEY, token);
    this.router.navigate(['/']);
    this.userService.me();
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem(AuthenticationService.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  public getToken(): string | null {
    return localStorage.getItem(AuthenticationService.TOKEN_KEY);
  }

  public getDecodeToken(): any {
    const token = this.getToken();
    if (token !== null)
      return this.jwtHelper.decodeToken(token);
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (token !== null) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }
}

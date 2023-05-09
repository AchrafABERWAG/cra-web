import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from 'src/app/models/client';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private htttp: HttpClient) { }

  getAll(): Observable<Array<Client>> {
    return this.htttp.get<Array<Client>>(`${environment.API_URL}/clients`)
  }
  addClient(client: Client): Observable<Client>{
    console.log("serviceClient: :",client);
    return this.htttp.post<Client>(`${environment.API_URL}/clients`,client)
    
  }
}

import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../service/client/client.service";
import { Client } from 'src/app/models/client';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private clientService: ClientService
    ) { 
    }

  clients: Array<Client> = [];
  addClient: boolean = false;
  displayedColumns: string [] = ['id', 'name', 'mail', 'phone','siret','tva','address'];
  clientForm: FormGroup = this.fb.group({
    name:[''],
    mail:[''],
    phone:[''],
    siret:[''],
    tva:[''],
    address:['']
  });
   
  ngOnInit(): void {
   this.clientService.getAll()
    .subscribe((data: Array<Client>) => {
      this.clients = data;
    })
  }
  
  add(){
    this.addClient = true;
  }

  onSubmit(): void {
    console.log('>', this.clientForm.value);
    this.clientService.addClient(this.clientForm.value)
      .subscribe((client: Client) => {
        this.clients = [...this.clients, client];
      });
    this.addClient = false;
  }

  onCancel(){
    this.clientForm.reset();
    this.addClient = false;
  }
}
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';
import {RoleService} from "../../service/role/role.service";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  constructor(private RoleService: RoleService) { }

  roles: Array<Role> = [];
  displayedColumns:     string[] = ['id', 'name'];
  
  ngOnInit(): void {
    this.RoleService.getAll()
    .subscribe((data: Array<Role>) => {
      console.log("contenu de data", data)
      this.roles = data;
    })
  }

}

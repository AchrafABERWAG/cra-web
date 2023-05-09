import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from "../../service/user/user.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/service/role/role.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private roleService: RoleService
  ) {
  }

  users: Array<User> = [];
  addUser: boolean = false;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'address', 'role'];

  roles: Array<Role> = [];
  userForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    role: this.formBuilder.group({
      id: [, [Validators.required]]
    })
  })

  ngOnInit(): void {
    this.userService.getAll()
      .subscribe((data: Array<User>) => {
        this.users = data;
      })
  }

  add() {
    //role
    this.roleService.getAll()
      .subscribe(roles => {
        this.roles = roles;
      })
    this.addUser = true;
  }

  onSubmit(): void {
    this.userService.addUser(this.userForm.value)
      .subscribe((user: User) => {
        this.users = [...this.users, user];
      });
    this.addUser = false;
  }

  onCancel() {
    this.userForm.reset();
    this.addUser = false;
  }
}

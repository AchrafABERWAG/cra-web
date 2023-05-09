import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthenticationService } from "./service/authentication/authentication.service";
import { User } from "./models/user";
import { UserService } from "./service/user/user.service";
import { Md5 } from 'ts-md5';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  profile?: User;
  profileObs = this.userService.profileSource.asObservable();

  constructor(
    public observer: BreakpointObserver,
    public router: Router,
    public authenticationService: AuthenticationService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.me()
    this.profileObs.subscribe(source => this.profile = source)
  }

  getHash(email: string): string {
    if (email !== '') {
      return Md5.hashStr(email);
    }
    return Md5.hashStr("committer");
  }
}

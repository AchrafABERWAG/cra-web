import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ClientComponent } from "./component/client/client.component";
import { ProjectComponent } from "./component/project/project.component";
import { UserComponent } from "./component/user/user.component";
import { ActivityComponent } from "./component/activity/activity.component";
import { RoleComponent } from './component/role/role.component';
import { TaskComponent } from './component/task/task.component';
import { LoginComponent } from "./component/login/login.component";
import { AuthGuardService } from "./service/authentication/auth-guard.service";

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'clients', component: ClientComponent, canActivate: [AuthGuardService] },
  { path: 'projects', component: ProjectComponent, canActivate: [AuthGuardService] },
  { path: 'users', component: UserComponent, canActivate: [AuthGuardService] },
  { path: 'roles', component: RoleComponent, canActivate: [AuthGuardService] },
  { path: 'activities', component: ActivityComponent, canActivate: [AuthGuardService] },
  { path: 'tasks', component: TaskComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivityComponent } from './component/activity/activity.component';
import { UserComponent } from './component/user/user.component';
import { ProjectComponent } from './component/project/project.component';
import { ClientComponent } from './component/client/client.component';
import { MaterialModule } from './shared/material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RoleComponent } from './component/role/role.component';
import { TaskComponent } from './component/task/task.component';
import { LoginComponent } from './component/login/login.component';
import { AuthenticationInterceptorService } from "./service/authentication/authentication-interceptor.service";

@NgModule({

  declarations: [
    AppComponent,
    HomeComponent,
    ActivityComponent,
    UserComponent,
    ProjectComponent,
    ClientComponent,
    RoleComponent,
    TaskComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],

})

export class AppModule { }

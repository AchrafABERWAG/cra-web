import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../service/authentication/authentication.service";
import { CraError } from "../../models/craerror";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  _error: CraError = {
    isThrown: false,
    msg: ''
  };

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService
  ) { }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    this._error.isThrown = false;
    this.auth.signInWithEmailAndPassword(this.loginForm.value)
      .subscribe({
        next: (token: string) => this.auth.saveTokenAndRedirect(token),
        error: (e) => this.errorHandler(e)
      });
  }

  errorHandler(e: any) {
    this._error.isThrown = true;
    if (e.status >= 500) {
      this._error.msg = 'server unavailable';
    } else {
      this._error.msg = 'Access is denied due to invalid credentials';
    }
  }
}

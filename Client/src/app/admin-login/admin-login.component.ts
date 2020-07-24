import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  snackBar: any;
  constructor(private router: Router,private _formBuilder: FormBuilder, private _auth: AuthenticationService,) { }

  ngOnInit(): void {
    var re = "^[a-zA-Z0-9]+$";
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });
  }
  login() {
    var data = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password,
    }
    this._auth.login(data).subscribe((res: any) => {

      if (res.success) {

        localStorage.setItem('email', data.email);
        let rolecheck = res.user.logRole
        if (rolecheck == "ADMIN") {
          localStorage.setItem('logRole', rolecheck)
          this.router.navigate(['/admin-panel']);
        }
        else if (rolecheck == "MAN") {
          localStorage.setItem('logRole', rolecheck)
          this.router.navigate(['/marketview']);
        }
      } 
    });
  }
}

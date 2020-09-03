import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  validCheck: boolean =false;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private _auth: AuthenticationService,


  ) { }


  ngOnInit() {
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
        this.validCheck = false;

        localStorage.setItem('email', data.email);

        // this.snackBar.open(res.message, "", {
        //     duration: 3000,
        //     horizontalPosition: 'end',
        //     verticalPosition: 'top',
        //     panelClass: ['successSnackbarclass']
        // });


        let rolecheck = res.user.logRole
        if (rolecheck == "MT") {
          localStorage.setItem('logRole', rolecheck)
          this.router.navigate(['/master/machine']);
        }
        else if (rolecheck == "MKT") {
          localStorage.setItem('logRole', rolecheck)
          this.router.navigate(['/marketview']);
        }
        else if (rolecheck == "TT") {
          localStorage.setItem('logRole', rolecheck)
          this.router.navigate(['/drawing']);
        }
        else if (rolecheck == "ET") {
          localStorage.setItem('logRole', rolecheck)
          this.router.navigate(['/drawing']);
        }
        else if (rolecheck == "UT") {
          localStorage.setItem('logRole', rolecheck)
          this.router.navigate(['/drawing']);
        }
        else if (rolecheck == "DIS") {
          localStorage.setItem('logRole', rolecheck)
          this.router.navigate(['/drawing']);
        }

      } else {
        this.loginForm.controls['email'].setErrors({'incorrect': true});
        this.loginForm.controls['password'].setErrors({'incorrect': true});

        this.validCheck =true;
        



      }
    });
  }

}

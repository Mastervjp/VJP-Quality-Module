import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar6',
  templateUrl: './navbar6.component.html',
  styleUrls: ['./navbar6.component.css']
})
export class Navbar6Component implements OnInit {


  email : any;

  constructor(private router: Router,) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
  }
  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }

}

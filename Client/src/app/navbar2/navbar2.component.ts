import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit {
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

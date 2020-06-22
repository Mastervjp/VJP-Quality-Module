import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar5',
  templateUrl: './navbar5.component.html',
  styleUrls: ['./navbar5.component.css']
})
export class Navbar5Component implements OnInit {

  email:any;
  constructor(private router: Router,) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');

  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar5',
  templateUrl: './navbar5.component.html',
  styleUrls: ['./navbar5.component.css']
})
export class Navbar5Component implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }

}

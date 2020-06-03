import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar3',
  templateUrl: './navbar3.component.html',
  styleUrls: ['./navbar3.component.css']
})
export class Navbar3Component implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }
  
  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }

}

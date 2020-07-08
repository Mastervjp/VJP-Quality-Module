import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit {

  constructor(private router: Router) { }

  fircheck: boolean;

  ngOnInit() {
    let temp = localStorage.getItem("firCheck");
    if (temp == '1') {
      this.fircheck = true
    }
    else {
      this.fircheck = false
    }
    this.fircheck;
  }


  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }

  drawing() {
    localStorage.removeItem('DrgCode');

    this.router.navigate(['/drawing']);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.css']
})
export class InspectionComponent implements OnInit {
  isTT: boolean;
  isUT: boolean;
  isDIS: boolean;

  constructor(private router: Router) { }

  fircheck: boolean;

  ngOnInit() {
    let temp = localStorage.getItem("firCheck");
    let status = localStorage.getItem('adminLogRole');
    let role = localStorage.getItem('logRole');

    if(role =="TT" ||status =="tec")
    {
      this.isTT =true;
    }
    else{
      this.isTT =false
    }

    if(role =="UT" ||status =="ope")
    {
      this.isUT =true
    }
    
    else{
      this.isUT =false
    }

    if(role =="DIS" ||status =="disp")
    {
      this.isDIS =true
    }
    
    else{
      this.isDIS =false
    }
    debugger
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

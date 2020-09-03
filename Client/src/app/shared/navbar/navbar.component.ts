import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  email: string;
  islog: any;
  isad: any;
  isSuper: any;
  isTT: boolean;
  isTEC: boolean;
  isET: boolean;
  isENGG: boolean;
  isDIS: boolean;
  isDISP: boolean;
  isUT: boolean;
  isOPE: boolean;
  isMKT: boolean;
  isMARKET: boolean;
  isMT: boolean;
  isMASTER: boolean;
  isMAN: boolean;
  isMANAGEMENT: boolean;
  isADMIN: boolean;
  pathDrawing: boolean;
  pathMarketView: boolean;
  pathContractView: boolean;
  isCOM: any;
  isPANEL: boolean;
  pathMaster: boolean;
  constructor(private router: Router, public auth: AuthenticationService, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
    let status = localStorage.getItem('adminLogRole')
    let logRole = localStorage.getItem('logRole');
    let path = this.activeRoute.snapshot.routeConfig.path;
    if (path == "drawing") {
      this.pathDrawing = false
    }
    else {
      this.pathDrawing = true
    }
    if (path == "marketview") {
      this.pathMarketView = false
    }
    else {
      this.pathMarketView = true
    }
    if (path == "contractreviewview") {
      this.pathContractView = false
    }
    else {
      this.pathContractView = true
    }
    if (path == "master/material" ||
      path == "master/operation" ||
      path == "master/machine" ||
      path == "master/drawing" ||
      path == "master/measure" ||
      path == "master/instrument" ||
      path == "master/castingtol" ||
      path == "master/machinetol" ||
      path == "master/heattreat" ||
      path == "master/specialpro"||
      path == "master/Incomingsource"||
      path == "master/Processcharacteristics"||
      path == "master/Productcharacteristics") {
      this.pathMaster = false
    }
    else {
      this.pathMaster = true
    }
    if (this.pathContractView == false || this.pathMarketView == false || this.pathMaster == false) {
      this.isCOM = false
    }
    else {
      this.isCOM = true
    }
    if (path == "admin-panel") {
      this.isPANEL = false
    }
    else {
      this.isPANEL = true
    }

    
    this.checkroles(status);
    this.checkrole(logRole);
    this.email = localStorage.getItem('email');
    this.islog = this.auth.isLoggedIn();
    this.isad = this.auth.isAdmin();
    this.isSuper = this.auth.isSuperAdmin();
  }
  checkroles(status) {
    if (status == 'tec') {
      this.isTEC = true;
    }
    else if (status == 'engg') {
      this.isENGG = true;
    }
    else if (status == 'disp') {
      this.isDISP = true;
    }
    else if (status == 'market') {
      this.isMARKET = true;
    }
    else if (status == 'master') {
      this.isMASTER = true;
    }
    else if (status == 'management') {
      this.isMANAGEMENT = true;
    }


    else {
      this.isTEC = false;
      this.isENGG = false;
      this.isDISP = false;
      this.isMARKET = false;
      this.isMASTER = false;
      this.isMANAGEMENT = false;
    }
    if (status == 'ope') {
      this.isOPE = true;
    }
    else {
      this.isOPE = false;
    }
    this.isUT


  }



  checkrole(logRole) {
    if (logRole == "TT") {
      this.isTT = true;
    }
    else if (logRole == "ET") {
      this.isET = true;
    }
    else if (logRole == "DIS") {
      this.isDIS = true;
    }
    else if (logRole == "MKT") {
      this.isMKT = true;
    }
    else if (logRole == "MT") {
      this.isMT = true;
    }
    else if (logRole == "MAN") {
      this.isMAN = true;
    }

    else {
      this.isTT = false;
      this.isET = false;
      this.isDIS = false;
      this.isMKT = false;
      this.isMT = false;
      this.isMAN = false;
    }
    if (logRole == "UT") {
      this.isUT = true;

    }

    else {
      this.isUT = false;

    }
    if (logRole == "ADMIN") {
      this.isADMIN = true;

    }

    else {
      this.isADMIN = false;

    }
  }

  Logout() {
    let roleCheck= localStorage.getItem('logRole')
    if(roleCheck == 'ADMIN') {
      localStorage.clear();
      this.router.navigate(['/admin']);
    } else {
      localStorage.clear();
      this.router.navigate(['/login']);
    }

  }


}

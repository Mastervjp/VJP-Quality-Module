import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MarketService } from '../services/market.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-market-abstract',
  templateUrl: './market-abstract.component.html',
  styleUrls: ['./market-abstract.component.css']
})
export class MarketAbstractComponent implements OnInit {

  dataSource : any;
  
  displayedColumns = ['id', 'cardNo', 'qty', 'createdAt' ,'action'];
  
  constructor(private _marketservice: MarketService, private router: Router, ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  ngOnInit() {
    this.getoperation();
  }

  getoperation() {
    let mpId = localStorage.getItem('mpId');
    this._marketservice.getAbstract(mpId).subscribe((res: any) => {
      if (res.success) {
        let mydata = res.data;
        this.dataSource = new MatTableDataSource(mydata);
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  viewroute(datas){

    localStorage.setItem("routeObj", JSON.stringify(datas));

    this.router.navigate(['/marketcard']); 


  }

  Logout(){ 
    localStorage.clear();
    this.router.navigate(['/login']);
  
  }

}

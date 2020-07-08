import { Component, OnInit,ViewChild } from '@angular/core';
import { ContractreviewService } from '../services/contractreview.service';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contractreview-view',
  templateUrl: './contractreview-view.component.html',
  styleUrls: ['./contractreview-view.component.css']
})
export class ContractreviewViewComponent implements OnInit {
 dataSource : any;
  
  displayedColumns = ['id','customerName','billTo','action'];
  constructor(private _contractreviewservice: ContractreviewService, private _formBuilder: FormBuilder,private router: Router) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  


  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this._contractreviewservice.getData().subscribe((res: any) => {

      this.dataSource = new MatTableDataSource(res.data);
    });
  }
  viewroute(data){

  debugger
    localStorage.setItem("customerName",data);


    this.router.navigate(['/contractreviewprintcomponent']); 


  }

}

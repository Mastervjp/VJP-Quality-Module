import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrawingService } from '../services/drawing.service';
import { OperationService } from '../services/operation.service';

@Component({
  selector: 'app-quality-plan',
  templateUrl: './quality-plan.component.html',
  styleUrls: ['./quality-plan.component.css']
})
export class QualityPlanComponent implements OnInit {
  type: string;
  dataset: any;

  constructor(private router: Router, private _opservice: OperationService, ) { }

  ngOnInit() {
    this.getDrawingtype();
  }

  getDrawingtype() {
    this._opservice.getDrawingtype().subscribe((res: any) => {
      if (res.success) {
        this.dataset = res.data;
      }
    });
  }


  checkplan() {
    localStorage.setItem('type', this.type);

    this.router.navigate(['/drawing']);
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['/login']);

  }

}

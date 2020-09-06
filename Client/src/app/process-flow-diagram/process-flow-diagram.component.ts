import { Component, OnInit } from '@angular/core';
import { OperationService } from '../services/operation.service';

@Component({
  selector: 'app-process-flow-diagram',
  templateUrl: './process-flow-diagram.component.html',
  styleUrls: ['./process-flow-diagram.component.css']
})
export class ProcessFlowDiagramComponent implements OnInit {
  drgObject: any;
  qpaObject: any;
  pfNo: any;
  process: any;

  constructor(private _service: OperationService) { }

  ngOnInit(): void {
    this.drgObject = JSON.parse(localStorage.getItem('drgObject'));
    this.qpaObject = JSON.parse(localStorage.getItem('qpaObject'));
    this.qpaObject = JSON.parse(localStorage.getItem('psObject'));
    // this.pfNo =JSON.parse(localStorage.getItem('pfNo'));
   this.getData();
   
   debugger
  }


getData(){
  let str =(localStorage.getItem('pfNo'));
    // console.log(str);
  
 
//   if(str.includes("-20")){
//     console.log("2");
    

//   }

//   else if(str.includes("-30")){
//     console.log("3");

//   }

//   else{
    
//     console.log("1");
//   }

// }
 
  if(str.includes("-20")){
    console.log("1");
    let id = (localStorage.getItem('DrgCode'));
    this._service.getAltprocess(id).subscribe((res: any) => {
      if (res.success) {
        this.process = res.data;
        debugger
      }
    });

  }

  else if(str.includes("-30")){
    console.log("2");
    let id = (localStorage.getItem('DrgCode'));
    this._service.getkindprocess(id).subscribe((res: any) => {
      if (res.success) {
        this.process = res.data;
        debugger
      }
    });
   
  }

  else{
    console.log("3");
    let id = (localStorage.getItem('DrgCode'));
    this._service.getoperation(id).subscribe((res: any) => {
      if (res.success) {
        this.process = res.data;
        debugger
      }
    });
  }
}
 
  printPage() {

    const printContent = document.getElementById("componentID");
    const WindowPrt = window.open('', '', 'left=10,top=10,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.write(`<style> 
      
      div{
        padding:5%
      }
     
.tg {
  border-collapse: collapse;
  border-spacing: 0;
}

.tg td {
  border-color: black;
  border-style: solid;
  border-width: 1px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  overflow: hidden;
  padding: 7px 5px;
  word-break: normal;
}

.tg th {
  border-color: black;
  border-style: solid;
  border-width: 1px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: normal;
  overflow: hidden;
  padding: 7px 5px;
  word-break: normal;
  }

   .tg .tg-0pky {
  border-color: inherit;
  text-align: left;
  vertical-align: top
       }

      .sec {
        border-collapse: collapse;
      border-spacing: 0;
       }


       .sec td {
        border-color: black;
        border-style: solid;
        border-width: 1px;
        font-family: Arial, sans-serif;
       font-size: 14px;
       overflow: hidden;
         padding: 7px 5px;
      word-break: normal;
      }

     .sec th {
      border-color: black;
      border-style: solid;
      border-width: 1px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      font-weight: normal;
      overflow: hidden;
      padding: 7px 5px;
      word-break: normal;
       }

     .sec .sec-0pky {
     border-color: inherit;
     text-align: left;
     vertical-align: top
    }
      .bottomBorder {
      border-bottom-color: transparent;
      }
      .rightBorder {
        border-right-color: transparent;
      }
      .leftBorder{
        border-top-color : transparent;
      }
      * {box-sizing: border-box}
      body, html {
        height: 100%;
        margin: 0;
        font-family: Arial;
      }
      .tablink {
        background-color: #555;
        color: white;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 5px 10px;
        font-size: 17px;
        width: 15%;
      }
      .tablink:hover {
        background-color: #777;
      }
      .tabcontent {
        color: black;
        display: none;
        padding: 50px 20px;
        height: 100%;
      }
      .bg {
      background-color:transparent;
      color: rgb(192, 192, 192);
      font-size: 40px;
      text-align: center;
      }
      .bg-text
      {
      color:lightgrey;
      font-size:40px;
      transform:rotate(300deg);
      -webkit-transform:rotate(300deg);
    
    }
      </style>`);


    setTimeout(function () {
      WindowPrt.document.close();
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
    }, 800);
  }


}

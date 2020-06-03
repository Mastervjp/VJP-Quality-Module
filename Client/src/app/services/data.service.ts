import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  public sharedData:any;


  setData (data,action) {
    this.sharedData = data;
    this.sharedData[action] = action;
  }
  getData () {

    return this.sharedData;
  }


}





import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StylesService {
  static blueColor ="#4389de";
  statusColors(key:string):string {
    switch (key) {
    // color of status
      case 'WAITING':
        return 'orange';
      case 'ACCEPTED':
        return 'green';
      case 'REFUSED':
        return 'red';
    // color of priority
      case 'HIGH':
        return 'red';
      case 'MEDIUM':
        return 'green';
      case 'LOW':
        return 'orange';
      // default
      default:
        return 'black';
    }
  }
  getBlueColor() {
    return "#4389de";
  }
  getGreenColor() {
    return "#aed546";
  }
  getGrayColor() {
    return "#bdbdbd";
  }
  getColorsTrueOrFalse(status :boolean){
    if(status) return "#77d545"
    else return "#e1a96c"
  }
}

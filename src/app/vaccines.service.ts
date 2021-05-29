import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class VaccinesService {

  constructor(private http:HttpClient) { }
  getData(){
    var slotDate=formatDate(new Date(),'dd-MM-yyyy','en')
    //let url='https://jsonplaceholder.typicode.com/todos';
    let url='https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=392&date='+slotDate;
    return this.http.get(url);
  }

  getSpecData(slotDate:string= formatDate(new Date(),'dd-MM-yyyy','en')){

    //let url='https://jsonplaceholder.typicode.com/todos';
    let url='https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=392&date='+slotDate;
    return this.http.get(url);
  }
}

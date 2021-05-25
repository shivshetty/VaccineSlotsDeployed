import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class VaccinesService {

  constructor(private http:HttpClient) { }
  getData(){
    //let url='https://jsonplaceholder.typicode.com/todos';
    let url='https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=392&date=22-05-2021'
    return this.http.get(url);
  }

  getSpecData(slotDate:string){

    //let url='https://jsonplaceholder.typicode.com/todos';
    let url='https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=392&date='+slotDate;
    return this.http.get(url);
  }
}

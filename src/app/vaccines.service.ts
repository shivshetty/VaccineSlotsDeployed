import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class VaccinesService {

  constructor(private http:HttpClient) { }

  getDistricts(stateid:number=21){   
    console.warn(stateid)
      let url='https://cdn-api.co-vin.in/api/v2/admin/location/districts/'+stateid;
      return this.http.get(url);      
  }

  getData(selectedDist:string){
    var slotDate=formatDate(new Date(),'dd-MM-yyyy','en')
    //let url='https://jsonplaceholder.typicode.com/todos';
    let url='https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=392&date='+slotDate;
    return this.http.get(url);
  }

  getSpecData(selectedDist:string,slotDate:string= formatDate(new Date(),'dd-MM-yyyy','en')){

    //let url='https://jsonplaceholder.typicode.com/todos';
    let url='https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id='+selectedDist+'&date='+slotDate;
    return this.http.get(url);
  }
}

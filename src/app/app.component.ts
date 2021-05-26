import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component } from '@angular/core';
import {VaccinesService} from './vaccines.service'
import { IsValidPipe } from "./is-valid.pipe";
import { FormBuilder } from '@angular/forms';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-root',      
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent {
  title = 'VaccineSlots';
  slots :any; 
  alldata:any; 
  pincode:string="";
  dose:string="0";
  formGroup;
  constructor(private fetchSlots :VaccinesService,private formBuilder: FormBuilder)  {
    this.formGroup=this.formBuilder.group({
      slotDate:new Date(),
      email: '',
      terms: false
    });

      this.fetchSlots.getData().subscribe(data=>{
        //console.warn(data);
        this.slots= data;        
        //this.slot=this.alldata.sessions
      });      
  }
  onSubmit(formData:any) {
    //debugger;
    var slotDate = formData['slotDate'];    
    slotDate = formatDate(slotDate,'dd-MM-yyyy','en');
    //alert(slotDate);
    this.fetchSlots.getSpecData(slotDate).subscribe(data=>{
      this.slots= data;              
    });  
  }

  /*unused function for now
  showFiltered(values: any){
    console.warn('function called')
  }
  */
}

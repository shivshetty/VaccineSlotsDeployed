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
  empty:any;
  alldata:any; 
  pincode:string="";
  dose:string="0";
  formGroup;
  testdate:any;
  dateList:any[];
  selected :any;

  constructor(private fetchSlots :VaccinesService,private formBuilder: FormBuilder)  {
    this.formGroup=this.formBuilder.group({
      slotDate:new Date()     
    });
    
      let dte=new Date();
      this.dateList=[new Date()];
      for (let i = 1; i < 7; i++) {        
      this.dateList[i]=new Date(dte.setDate(dte.getDate()+1));
      }

      this.fetchSlots.getSpecData().subscribe(data=>{
        //console.warn(data);
        this.slots=this.ReturnNonZeroes(data);        
        this.empty=this.ReturnEmpty(data);            
        //this.slot=this.alldata.sessions
      });      
  }
  onSubmit(formData:any) {
    //debugger;
    var slotDate = formData['slotDate'];    
    slotDate = formatDate(slotDate,'dd-MM-yyyy','en');
    //alert(slotDate);
    this.fetchSlots.getSpecData(slotDate).subscribe(data=>{
      this.slots=this.ReturnNonZeroes(data);
      this.empty=this.ReturnEmpty(data);
    });      
    }
    
    ReturnNonZeroes(data:any){
      return data.sessions.filter(function(datavals:any){
        return  (datavals.available_capacity_dose1>0 || datavals.available_capacity_dose2>0 );
      });
    }
    ReturnEmpty(data:any){
      return data.sessions.filter(function(datavals:any){
        return  (datavals.available_capacity_dose1==0 && datavals.available_capacity_dose2==0 );
      });
    }

    getNext(fetchFor:any){
      var slotDate=formatDate(fetchFor,'dd-MM-yyyy','en');
      this.fetchSlots.getSpecData(slotDate).subscribe(data=>{
        this.slots=this.ReturnNonZeroes(data);
        this.empty=this.ReturnEmpty(data);
      });  
    }  

  /*Function required for later
  showFiltered(values: any){
    console.warn('function called')
  }
  */
}

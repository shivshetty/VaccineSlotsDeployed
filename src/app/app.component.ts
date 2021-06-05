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
  searchText:string="";
  dose:string="0";
  formGroup;
  testdate:any;
  dateList:any[];
  clicked:any="";
  districtList:any;
  selectedDist:string="392";

  constructor(private fetchSlots :VaccinesService,private formBuilder: FormBuilder)  {
    this.formGroup=this.formBuilder.group({
      slotDate:new Date()     
    });

      this.fetchSlots.getDistricts().subscribe(data=>{
        //console.warn(data);
          this.districtList=data;
          //console.warn(this.districtList);
      });
    
      let dte=new Date();
      
      this.dateList=[new Date()];
      for (let i = 1; i < 7; i++) {        
      this.dateList[i]=new Date(dte.setDate(dte.getDate()+1));
      }

      this.clicked=this.dateList[0];    

      this.fetchSlots.getSpecData(this.selectedDist).subscribe(data=>{
        //console.warn(data);
        this.slots=this.ReturnNonZeroes(data);        
        this.empty=this.ReturnEmpty(data);    
        this.slots= this.slots.sort((a:any,b:any)=>a.center_id>b.center_id?1:-1)              
        //this.slot=this.alldata.sessions
      });      
  }
  onSubmit(formData:any) {
    //debugger;
    var slotDate = formData['slotDate'];    
    slotDate = formatDate(slotDate,'dd-MM-yyyy','en');
    //alert(slotDate);
    this.fetchSlots.getSpecData(this.selectedDist,slotDate).subscribe(data=>{
      this.slots=this.ReturnNonZeroes(data);      
      this.empty=this.ReturnEmpty(data);
      this.slots= this.slots.sort((a:any,b:any)=>a.center_id>b.center_id?1:-1)      
      this.empty= this.empty.sort((a:any,b:any)=>a.center_id>b.center_id?1:-1)      
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
      console.warn("clicked");
      console.warn(this.clicked);    
      //console.warn(this.selectedDist);
      var slotDate=formatDate(fetchFor,'dd-MM-yyyy','en');
      //console.warn(slotDate);
      this.fetchSlots.getSpecData(this.selectedDist, slotDate).subscribe(data=>{
        this.slots=this.ReturnNonZeroes(data);
        this.empty=this.ReturnEmpty(data);
        this.slots= this.slots.sort((a:any,b:any)=>a.center_id>b.center_id?1:-1)      
        this.empty= this.empty.sort((a:any,b:any)=>a.center_id>b.center_id?1:-1)      
      });   
    }

    distChange(){
      console.warn('distChange');
      console.warn(this.selectedDist);
      console.warn(this.clicked);
      var slotDate=formatDate(this.clicked,'dd-MM-yyyy','en');
      this.fetchSlots.getSpecData(this.selectedDist,slotDate).subscribe(data=>{
        this.slots=this.ReturnNonZeroes(data);
        this.empty=this.ReturnEmpty(data);
        this.slots= this.slots.sort((a:any,b:any)=>a.center_id>b.center_id?1:-1)      
        this.empty= this.empty.sort((a:any,b:any)=>a.center_id>b.center_id?1:-1)      
      }); 
    }

    isActive(){      
      return "active";
    }
    isInActive(){
      return "";
    }


  

  /*Function required for later
  showFiltered(values: any){
    console.warn('function called')
  }
  */
}

import { NgIterable, Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'isValid'
})
export class IsValidPipe implements PipeTransform {

  slots :any; 
  //transform(value: unknown, ...args: unknown[]): unknown {
   transform(value: any,searchText:string,dose:string,age:string): any {
     //console.warn(age);
 
    //#region Filter by pincode
    if(searchText.length>0){
      this.slots= value.filter(function(search:any){
        //console.warn(search.name.includes(searchText));
        return (search.pincode.toString().indexOf(searchText)>-1 || search.name.toLowerCase().indexOf(searchText.toLowerCase())> -1 || search.address.toLowerCase().indexOf(searchText.toLowerCase())> -1);
      //search.pincode.toString().indexOf(pincode)>-1 || 
    });
    //return this.slots;
  }
  else{
    this.slots= value;
  }
//#region Filter by dose type
if(dose=="0") this.slots=this.slots;
else if(dose=="1") this.slots= this.slots.filter(function(test:any){return test.available_capacity_dose1>0})
else if(dose=="2") this.slots=this.slots.filter(function(test:any){return test.available_capacity_dose2>0 })
if(age=="0") this.slots=this.slots;
else if(age=="1") this.slots=this.slots.filter(function(test:any){return test.min_age_limit==18})
else if(age=="2") this.slots=this.slots.filter(function(test:any){return test.min_age_limit==45})
return this.slots;
  }
}

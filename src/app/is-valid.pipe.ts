import { NgIterable, Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'isValid'
})
export class IsValidPipe implements PipeTransform {

  slots :any; 
  //transform(value: unknown, ...args: unknown[]): unknown {
   transform(value: any,pincode:string,dose:string): any {
     //console.warn(pincode);
 
    //#region Filter by pincode
    if(pincode.length>0){
      this.slots= value.filter(function(search:any){
        console.warn(search.name.includes(pincode));
        return (search.pincode.toString().indexOf(pincode)>-1 || search.name.toLowerCase() .indexOf(pincode.toLowerCase())> -1);
      //search.pincode.toString().indexOf(pincode)>-1 || 
    });
    //return this.slots;
  }
  else{
    this.slots= value;
  }
//#region Filter by dose type
      if(dose=="0") return this.slots;
      if(dose=="1") return this.slots.filter(function(test:any){return test.available_capacity_dose1>0})
      if(dose=="2") return this.slots.filter(function(test:any){return test.available_capacity_dose2>0 })
      return this.slots;
     
  }
}

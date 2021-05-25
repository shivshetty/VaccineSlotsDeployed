import { NgIterable, Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'isValid'
})
export class IsValidPipe implements PipeTransform {

  //transform(value: unknown, ...args: unknown[]): unknown {
   transform(value: any,pincode:string,dose:string): any {
     console.warn(dose);
      if(dose=="0") return value;
      if(dose=="1") return value.filter(function(test:any){return test.available_capacity_dose1>1})
      if(dose=="2") return value.filter(function(test:any){return test.available_capacity_dose2>1})
      return value //as unknown as {[key: string]: string} || {}
      // return value.filter(function(search:any){
      //   return search.name.indexOf(pincode)>-1
      // });
  }
}

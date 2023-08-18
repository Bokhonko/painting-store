import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(phoneNum: string): string {
    phoneNum = phoneNum.replace(/[^\d]/g, '') 
    const firstNull = phoneNum.indexOf('0')  
    phoneNum = phoneNum.slice(firstNull)  
    phoneNum = '+380' + ' (' + phoneNum.slice(1, 3) + ') ' + phoneNum.slice(3, 6) + '-' + phoneNum.slice(6, 8) + '-' + phoneNum.slice(8, 10)
    return phoneNum;
  }

}

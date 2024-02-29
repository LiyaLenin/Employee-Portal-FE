import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allusers: any[], searchKey: string): any[] {
    const result: any = []
    if (!allusers || searchKey == "") {
      return allusers
    }
    allusers.forEach((item => {
      console.log(item);
      
      // if(item.id!='1'){
        if (item.name?.trim().toLowerCase().includes(searchKey.trim().toLowerCase())) {
          result.push(item)
          
                }
      // }
    }))
    return result;

  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(DataArray: any[], searchString: string, searchKey: string): any {
    if (!DataArray || !searchString || !searchKey) {
      return DataArray;
    } else {
      return DataArray.filter((item: any) => {
        // Check if the item has the specified search key and if it's an object
        if (item[searchKey] && typeof item[searchKey] === 'string') {
          // Ensure that the property exists and is a string before calling trim
          return item[searchKey].trim().toLowerCase().includes(searchString.trim().toLowerCase());
        } else {
          // If the search key doesn't exist in the item or is not a string, return false
          return false;
        }
      });
    }
  }
}

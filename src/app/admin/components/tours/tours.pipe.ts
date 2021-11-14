import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toursBackgroundImageData'})
export class ToursBackgroundImagePipe implements PipeTransform {
  transform(data: any) : string {
    return Object.keys(data).length > 0 ? data.toursBackgroundImageUrl : '';
  }
}

@Pipe({ name: 'toursData'})
export class ToursPipe implements PipeTransform {
  transform(data: any): any {
    return Object.keys(data).length > 0
      ? Object.keys(data.tours)
          .map(id => ({ id: id, ... data.tours[id] }))
          .sort((n1, n2) => n2.year - n1.year)
      : [];
      
  }
}
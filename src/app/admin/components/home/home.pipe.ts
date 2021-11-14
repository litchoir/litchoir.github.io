import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'newsItemsData'})
export class NewsItemsPipe implements PipeTransform {
  transform(data: any): any {
    return Object.keys(data).length > 0
      ? Object.keys(data.newsItems)
          .map(id => ({ id: id, ... data.newsItems[id] }))
          .sort((n1, n2) => n2.date - n1.date)
      : [];
      
  }
}

@Pipe({ name: 'featuredVideoData'})
export class FeaturedVideoPipe implements PipeTransform {
  transform(data: any) : string {
    return Object.keys(data).length > 0 ? data.featuredVideoLink : '';
  }
}

@Pipe({ name: 'homeBackgroundImageData'})
export class HomeBackgroundImagePipe implements PipeTransform {
  transform(data: any) : string {
    return Object.keys(data).length > 0 ? data.homeBackgroundImageUrl : '';
  }
}
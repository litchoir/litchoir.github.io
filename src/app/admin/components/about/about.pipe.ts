import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'aboutBackgroundImageData'})
export class AboutBackgroundImagePipe implements PipeTransform {
  transform(data: any) : string {
    return Object.keys(data).length > 0 ? data.aboutBackgroundImageUrl : '';
  }
}

@Pipe({ name: 'aboutAuditionDeadline'})
export class AboutAuditionDeadlinePipe implements PipeTransform {
  transform(data: any) : string {
    return Object.keys(data).length > 0 ? data.aboutAuditionDeadline : '';
  }
}
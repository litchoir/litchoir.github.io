import { Pipe, PipeTransform } from '@angular/core';

const directorOrder = [
  'Lead Director',
  'Assistant Director'
];

const officerOrder = [
  'President',  
  'Vice President',
  'Secretary', 
  'Tour Director', 
  'Treasurer', 
  'Business Manager',
  'Alumni Relations',
  'Webmaster',
  'Liturgical Commissioner'
];

@Pipe({ name: 'peopleBackgroundImageData'})
export class PeopleBackgroundImagePipe implements PipeTransform {
  transform(data: any) : string {
    return Object.keys(data).length > 0 ? data.peopleBackgroundImageUrl : '';
  }
}

@Pipe({ name: 'directorsData'})
export class DirectorsPipe implements PipeTransform {
  transform(data: any): any {
    return Object.keys(data).length > 0
      ? Object.keys(data.directors)
          .map(id => ({ id: id, ... data.directors[id] }))
          .sort((o1, o2) => directorComparatorFunction(o1, o2))
      : [];
  }
}


@Pipe({ name: 'graduateStudentsData'})
export class GraduateStudentsPipe implements PipeTransform {
  transform(data: any): any {
    return Object.keys(data).length > 0
      ? Object.keys(data.graduateStudents)
        .map(id => ({ id: id, ... data.graduateStudents[id] }))
        .sort((g1, g2) => g1.date - g2.date)
      : [];
  }
}

@Pipe({ name: 'officersData'})
export class OfficersPipe implements PipeTransform {
  transform(data: any): any {
    return Object.keys(data).length > 0
      ? Object.keys(data.officers)
          .map(id => ({ id: id, ... data.officers[id] }))
          .sort((o1, o2) => officerComparatorFunction(o1, o2))
      : [];
  }
}

const officerComparatorFunction: (o1: any, o2: any) => number = (o1, o2) => {
  return officerOrder.findIndex((off) => o1.position.includes(off)) - officerOrder.findIndex((off) => o2.position.includes(off));
}

const directorComparatorFunction: (o1: any, o2: any) => number = (o1, o2) => {
  return directorOrder.findIndex((off) => o1.position.includes(off)) - officerOrder.findIndex((off) => o2.position.includes(off));
}
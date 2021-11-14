import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lc-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {

  constructor() { }
  @Input() data: any;
  @Output() textContentChanged: EventEmitter<any> = new EventEmitter();
  
  passTextContentChange(event: any) {
    this.textContentChanged.emit(event);
  }
}

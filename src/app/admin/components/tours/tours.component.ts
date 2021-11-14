import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'lc-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent {

  @Input() data: any;
  @Input() isLoading: boolean;

  constructor() { }

  @Output() textContentChanged: EventEmitter<any> = new EventEmitter();
  
  passTextContentChange(event: any) {
    this.textContentChanged.emit(event);
  }

}

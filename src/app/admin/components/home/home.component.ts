import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
@Component({
  selector: 'lc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  @Input() data: any;
  @Input() isLoading: boolean;
  @Output() textContentChanged: EventEmitter<any> = new EventEmitter();
  
  passTextContentChange(event: any) {
    this.textContentChanged.emit(event);
  }
}

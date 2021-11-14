import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lc-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @Input() data: any;
  @Input() isLoading: boolean;
  @Output() textContentChanged: EventEmitter<any> = new EventEmitter();
  
  passTextContentChange(event: any) {
    this.textContentChanged.emit(event);
  }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lc-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input() title = '';
  @Input() tooltipMessage: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}

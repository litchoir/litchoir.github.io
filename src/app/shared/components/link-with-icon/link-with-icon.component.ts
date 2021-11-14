import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lc-link-with-icon',
  templateUrl: './link-with-icon.component.html',
  styleUrls: ['./link-with-icon.component.css']
})
export class LinkWithIconComponent {

  @Input() src = '';
  @Input() text = '';
  @Input() svgPaths : any = [];

  constructor() {
  }

}

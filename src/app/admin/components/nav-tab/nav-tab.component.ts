import { Component, Input } from '@angular/core';

@Component({
  selector: 'lc-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.css']
})
export class NavTabComponent {
  @Input() name = '';
  @Input() isActive = false;

  constructor() {}
}

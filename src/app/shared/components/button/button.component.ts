import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lc-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() extraConfig = {};
  @Input() collapsible = false;
  @Input() variation = 'fill';
  @Input() type = 'primary';
  @Input() isDisabled = false;
  @Output() buttonClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  buttonClicked () {
    this.buttonClick.emit();
  }

  computeButtonClasses() {
    return [
      'btn',
      `btn-${this.type}-${this.isDisabled ? 'light' : 'dark'}`
    ];
  }

}

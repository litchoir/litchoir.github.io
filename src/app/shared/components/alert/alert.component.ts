import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lc-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() type = '';
  @Input() boldText = '';
  @Input() regularText = '';
  @Input() emoji = '';

  constructor() { }

  ngOnInit(): void {
  }

}

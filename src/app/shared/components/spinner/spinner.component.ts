import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lc-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  @Input() colored: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}

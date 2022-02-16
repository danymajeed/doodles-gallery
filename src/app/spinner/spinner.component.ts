import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  constructor() {}

  @Input()
  width = 30;

  @Input()
  height = 30;

  ngOnInit(): void {}
}

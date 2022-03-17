import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-big-vid',
  templateUrl: './big-vid.component.html',
  styleUrls: ['./big-vid.component.scss'],
})
export class BigVidComponent implements OnInit {

  @Input() inputMedia;

  constructor() { }

  ngOnInit() {}

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vid',
  templateUrl: './vid.component.html',
  styleUrls: ['./vid.component.scss'],
})
export class VidComponent implements OnInit {

  @Input() inputMedia
  constructor() { }

  ngOnInit() {
    console.log(this.inputMedia)
  }

}

import { Component, OnInit } from '@angular/core';
import {Individual} from "./individual";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  const MAXINV = 21;
  target = 'Haha, tin nguoi vcl :)';
  elems: Individual[];
  mutateRate = 0.2;

  constructor() {

  }

  ngOnInit() {
    this.elems = new Array()[this.MAXINV];
    for (let i = 0; i < this.elems.length; i++) {
      this.elems[i] = new Individual('', this.target);
    }
  }

  newGeneration() {
    let newGen: Individual[] = new Array()[this.MAXINV];
    for (let i = 0; i < this.MAXINV; i += 3){
      newGen[i] = this.elems[i]; //
    }
  }

}

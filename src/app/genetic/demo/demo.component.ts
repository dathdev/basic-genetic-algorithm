import { Component, OnInit } from '@angular/core';
import {Individual} from './individual';
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  private possibleCharacters = 'abcdefghijklmnopqrstuvwxyz';
  private MAXINV = 200;

  target = 'kienancac';

  curGen: Array<Individual>;
  matingPool: Array<Individual>;

  mutateRate = 0.1;
  sumFitness = 0;
  maxFitness = 0;
  bestString = '';
  found = false;

  constructor() {

  }

  ngOnInit() {
    this.curGen = new Array();
    this.sumFitness = 0;
    this.maxFitness = 0;
    for (let i = 0; i < this.MAXINV; i++) {
      let newInv = new Individual(this.randomString(this.target.length), this.target)
      this.curGen.push(newInv);
      this.sumFitness += newInv.getFitness();
      if (newInv.getFitness() > this.maxFitness){
        this.maxFitness = newInv.getFitness();
        this.bestString = newInv.content;
      }
    }
  }

  randomString(length: number) {
    let s = '';
    for (let i = 0; i < length; i++) {
      let p = Math.floor(Math.random() * (this.possibleCharacters.length - 1));
      s += this.possibleCharacters[p];
    }
    return s;
  }

  newGeneration() {
    this.matingPool = [];

    for (let i = 0; i < this.curGen.length; i++) { // get mating pool
      for (let j = 0; j < this.curGen[i].getFitness(); j++)
        this.matingPool.push(this.curGen[i]);
    }

    console.log (this.matingPool);

    this.curGen = [];

    this.sumFitness = 0;
    this.maxFitness = 0;

    for (let i = 0; i < this.MAXINV; i++) {
      //pick 2 parents
      let p1: Individual;
      let p2: Individual;
      let p = Math.floor(Math.random() * this.matingPool.length);
      p1 = this.matingPool[p];
      p = Math.floor(Math.random() * this.matingPool.length);
      p2 = this.matingPool[p];
      // console.log('parents: ' + p1.content + '-' + p1.getFitness() + '|' + p2.content + '-' + p2.getFitness());

      //crossover
      let child = p1.crossover(p2);
      //mutation
      child.attemptMutate(this.mutateRate);
      // console.log (p1);
      if (child.content === this.target) {
        this.found = true;
      }
      this.sumFitness += child.getFitness();
      if (child.getFitness() > this.maxFitness) {
        this.maxFitness = child.getFitness();
        this.bestString = child.content;
      }
      this.curGen.push(child);
    }
  }

  nextTenGeneration() {
    // setTimeout(() => {
    for (let i = 0; i < 10; i++){
      this.newGeneration();
    }
    // });
  }
}

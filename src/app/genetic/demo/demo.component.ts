import { Component, OnInit } from '@angular/core';
import {Individual} from './individual';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  private possibleCharacters = 'abcdefghijklmnopqrstuvwxyz';
  private MAXINV = 200;

  target = 'abcdefghij';

  curGen: Array<Individual>;
  matingPool: Array<Individual>;

  mutateRate = 0.1;
  sumFitness = 0;
  maxFitness = 0;
  bestString = '';
  found = false;
  currentTimeout;

  constructor() {

  }

  ngOnInit() {
    this.curGen = new Array();
    this.sumFitness = 0;
    this.maxFitness = 0;
    for (let i = 0; i < this.MAXINV; i++) {
      let newInv = new Individual(this.randomString(5), this.target)
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

    this.curGen = [];

    this.sumFitness = 0;
    this.maxFitness = 0;

    for (let i = 0; i < this.MAXINV; i++) {
      // pick 2 parents
      let p1: Individual;
      let p2: Individual;
      let p = Math.floor(Math.random() * this.matingPool.length); // random parent in mating pool
      p1 = this.matingPool[p];
      p = Math.floor(Math.random() * this.matingPool.length); // random parent in mating pool
      p2 = this.matingPool[p];

      // crossover
      let child = p1.crossover(p2); // p1 fucks p2

      // mutation
      child.attemptMutate(this.mutateRate); // X-string arrives!

      // update target
      child.setTarget(this.target);

      // find best individual and calculate fitness sum
      if (this.maxFitness === 100) {
        this.found = true;
      }
      this.sumFitness += child.getFitness();
      if (child.getFitness() > this.maxFitness) {
        this.maxFitness = child.getFitness();
        this.bestString = child.content;
      }

      // add the new born child into the generation pool

      this.curGen.push(child);
    }
  }

  autoGenerate() {
    this.currentTimeout = setTimeout(() => {
      if (this.maxFitness !== 100) {
        this.newGeneration();
        this.autoGenerate();
      }
   }, 100);
  }

  stopAuto() {
    clearTimeout(this.currentTimeout);
  }
}

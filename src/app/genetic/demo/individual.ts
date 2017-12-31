export class Individual {
  private content: string;
  private target: string;
  private fitness: number;
  constructor(content: string, target: string){
    this.content = content;
    this.target = target;
    this.calculateFitness();
  }

  setTarget(target: string) {
    this.target = target;
  }

  calculateFitness(){
    let sum = 0;
    for (let i = 0; i < this.content.length; i++){
      if (this.content[i] === target[i]) {
        sum++;
      }
    }
    this.fitness = sum / this.content.length * 100;
  }

  crossWith (wife: Individual) {
    let newInv: Individual;
    newInv = this;
    for (let i = 0; i < this.)
    return newInv;
  }
}

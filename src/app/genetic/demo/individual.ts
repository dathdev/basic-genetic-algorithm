export class Individual {
  content: string;
  target: string;
  private fitness: number;
  private possibleCharacters = 'abcdefghijklmnopqrstuvwxyz';
  constructor(content: string, target: string){
    this.content = content;
    this.target = target;
    this.calculateFitness();
  }

  setTarget(target: string) {
    this.target = target;
  }

  getFitness(){
    return this.fitness;
  }

  calculateFitness(){
    let sum = 0;
    for (let i = 0; i < this.content.length; i++){
      if (this.content[i] === this.target[i]) {
        sum++;
      }
    }
    this.fitness = sum / this.content.length * 100;
  }

  attemptMutate(rate: number) {
    for (let i = 0; i < this.content.length; i++){
      let p = Math.random() * 100;
      if (p < rate) { // mutate rate
        this.replaceAt(i, this.randomCharacter());
      }
    }
    this.calculateFitness();
  }

  randomCharacter() {
    return this.possibleCharacters[Math.floor(Math.random() * this.possibleCharacters.length)];
  }

  replaceAt(index: number, ch: string) {
    this.content = this.content.substring(0, index) + ch + this.content.substring(index + 1, this.content.length);
  }
}

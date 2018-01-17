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
    let missing = Math.abs(this.content.length - this.target.length);
    this.fitness = sum / (this.target.length) * 100 + (this.content.length - sum) / (this.target.length) * 50;
    if (this.content.length > this.target.length) {
      this.fitness -= missing / this.target.length * 75;
    }
    // console.log(missing);
    // this.fitness = this.fitness - missing * this.fitness;
  }

  crossover(partner: Individual) {
    let child = new Individual('', this.target);
    let mid = Math.floor(Math.random() * Math.abs(this.content.length - partner.content.length) + 1)
      + (this.content.length > partner.content.length ? partner.content.length : this.content.length);
    // let max = (this.content.length > partner.content.length ? this.content.length : partner.content.length);
    for (let i = 0; i < mid; i++) {
      if (i % 2 === 0 && i < this.content.length) {
        if (i < this.content.length) {
          child.content += this.content[i];
        }
      } else {
        if (i < partner.content.length) {
          child.content += partner.content[i];
        }
      }
    }
    return child;
  }

  attemptMutate(rate: number) {
    for (let i = 0; i < this.content.length; i++){
      let p = Math.random() * 100;
      if (p < rate) { // mutate rate
        p = (Math.random() * 100);
        if (p < 33.33) {
          this.replaceAt(i, this.randomCharacter());
        } else if (p < 66.66) {
          this.removeAt(i);
        } else {
          this.addAt(i, this.randomCharacter());
        }
      }
    }
    // let p = Math.random() * 100 * this.content.length;
    // if (p < rate * this.content.length) {
    //   p = Math.random() * 100;
    //   if (p < 50) {
    //     this.removeAt(this.content.length);
    //   } else {
    //     this.addAt(this.content.length, this.randomCharacter());
    //   }
    // }
    // let lengthMutatePossibility = Math.random() * 100 / this.content.length;
    // if (lengthMutatePossibility < rate) {
    //   console.log("mutate: length")
    //   let upOrDown = Math.random() * 100;
    //   let pos = Math.floor(Math.random() * (this.content.length - 1));
    //   if (upOrDown < 50) { // remove
    //     console.log("    mutate: remove");
    //     console.log("    " + this.content);
    //     this.removeAt(pos);
    //     console.log("    " + this.content);
    //   } else { // add
    //     console.log("    mutate: add");
    //     console.log("    " + this.content);
    //     this.addAt(pos, this.randomCharacter());
    //     console.log("    " + this.content);
    //   }
    // }
    this.calculateFitness();
  }

  randomCharacter() {
    return this.possibleCharacters[Math.floor(Math.random() * (this.possibleCharacters.length - 1))];
  }

  removeAt(index: number) {
    // console.log ("-" + this.content + " " + index + " " + ch);
    console.log ("remove -" + this.content + " " + index);
    if (index >= 0 && index < this.content.length) {
      this.content = this.content.substring(0, index) + this.content.substring(index + 1, this.content.length);
    }
    console.log ("+" + this.content);
  }

  addAt(index:number, ch:string) {
    console.log ("add -" + this.content + " " + index + " " + ch);
    if (index >= this.content.length) {
      this.content = this.content + ch;
    } else if (index > 0) {
      this.content = this.content.substring(0, index) + ch + this.content.substring(index);
    } else {
      this.content = ch + this.content;
    }
    console.log ("+" + this.content);
  }

  replaceAt(index: number, ch: string) {
    console.log ("replace - " + this.content + " " + index + " " + ch);
    if (index < this.content.length && index >= 0) {
      this.content = this.content.substring(0, index - 1) + ch + this.content.substring(index);
    }
    console.log ("+" + this.content);
  }

  sigmoid(t) {
    return 1 / (1 + Math.pow(Math.E, -t));
  }
}

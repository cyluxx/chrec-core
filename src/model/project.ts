import { Sequence } from './sequence';

export class Project {
  constructor(public name: string, public sequences: Sequence[]) { }

  public addSequence(sequence: Sequence) {
    this.sequences.push(sequence);
  }
}

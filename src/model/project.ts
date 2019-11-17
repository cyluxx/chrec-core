import { Sequence } from './sequence';
import { Settings } from './settings';

export class Project {
  constructor(public name: string, public sequences: Sequence[]) {}

  public addSequence(sequence: Sequence) {
    this.sequences.push(sequence);
  }

  public async test(settings: Settings) {
    for (const sequence of this.sequences) {
      await sequence.test(settings);
    }
  }
}

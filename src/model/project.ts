import { Sequence } from './sequence';
import { Settings } from './settings';
import { Identificable } from './identififable';

export class Project extends Identificable {
  constructor(public name: string, public sequences: Sequence[]) {
    super();
  }

  public addSequence(sequence: Sequence) {
    this.sequences.push(sequence);
  }

  public async test(settings: Settings) {
    for (const sequence of this.sequences) {
      await sequence.test(settings);
    }
  }
}

import { Identificable } from './identififable';
import { Sequence } from './sequence';
import { Settings } from './settings';

export class Project extends Identificable {
  constructor(public name: string, public sequences: Sequence[], id?: string) {
    super(id);
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

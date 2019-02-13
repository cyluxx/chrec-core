import { Sequence } from './sequence';

export class Project {
  constructor(private name: string, private sequences: Sequence[]) {}

  public getSequences(): Sequence[] {
    return this.sequences;
  }
}

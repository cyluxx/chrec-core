import { Identificable } from './identififable';

export class LocatorTestResult extends Identificable {
  constructor(public replayable: boolean, id?: string) {
    super(id);
  }
}

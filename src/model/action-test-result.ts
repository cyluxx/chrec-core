import { Browser } from './browser';
import { Identificable } from './identififable';

export abstract class ActionTestResult extends Identificable {
  constructor(public browser: Browser) {
    super();
  }
}

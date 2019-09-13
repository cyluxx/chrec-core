import { Reviver } from 'load-json-file';
import { Action } from './action/action';

export class Sequence {

  constructor(public name: string, public actions: Action[]) { }

  public addAction(action: Action): void {
    this.actions.push(action);
  }
}

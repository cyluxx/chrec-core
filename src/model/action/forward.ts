import { Action } from './action';

export class Forward extends Action {
  constructor(image: string) {
    super(image);
  }
}

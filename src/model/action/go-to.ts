import { Action } from './action';

export class GoTo extends Action {
  constructor(image: string, private url: string) {
    super(image);
  }
}

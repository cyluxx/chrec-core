import { Action as AlexAction } from './action';

export class Step {
  private type: string = 'action';
  private disabled: boolean = false;
  private ignoreFailure: boolean = false;
  private negated: boolean = false;
  private errorOutput = null;

  constructor(private action: AlexAction, private position: number) {
    this.action = action;
    this.position = position;
  }
}

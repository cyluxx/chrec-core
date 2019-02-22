import { Action as AlexAction } from './action';

export class Step {
  public type: string = 'action';
  public disabled: boolean = false;
  public ignoreFailure: boolean = false;
  public negated: boolean = false;
  public errorOutput = null;

  constructor(public action: AlexAction, public position: number) {
    this.action = action;
    this.position = position;
  }
}

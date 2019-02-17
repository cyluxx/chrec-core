import { Action } from '../action/action';
import { TestResult } from './test-result';

export class ActionTestResult extends TestResult {
  private valid: boolean;

  constructor(date: Date, private action: Action, valid?: boolean) {
    super(date);

    this.valid = false;
    if (valid) {
      this.valid = valid;
    }
  }

  public getAction(): Action {
    return this.action;
  }

  public isReplayable(): boolean {
    return this.valid;
  }

  public getSuccessfulLocatorCount(): number {
    return 0;
  }

  public getTotalLocatorCount(): number {
    return 0;
  }
}

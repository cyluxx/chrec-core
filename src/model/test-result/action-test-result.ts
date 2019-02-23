import { Action } from '../action/action';
import { TestResult } from './test-result';

export class ActionTestResult implements TestResult {
  private valid: boolean;

  constructor(private date: Date, private action: Action, valid?: boolean) {
    this.valid = false;
    if (valid) {
      this.valid = valid;
    }
  }

  public getDate(): Date {
    return this.date;
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

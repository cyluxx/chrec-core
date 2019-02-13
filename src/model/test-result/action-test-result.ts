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

  public isReplayable(): boolean {
    return this.valid;
  }

  public getSuccessfulReplayCount(): number {
    if (this.valid) {
      return 1;
    }
    return 0;
  }
}

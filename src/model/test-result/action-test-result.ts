import { Action } from '../action/action';
import { TestResult } from './test-result';

export class ActionTestResult extends TestResult {

  constructor(date: Date, public action: Action, public valid: boolean) {
    super(date, [])
  }

  public addChildTestResult(childTestResult: TestResult): void {
    throw new Error(`Internal: Do not add a childTestResult to ActionTestResult`);
  }

  public isReplayable(): boolean {
    return this.valid;
  }
}

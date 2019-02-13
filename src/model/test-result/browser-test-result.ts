import { ActionTestResult } from './action-test-result';
import { TestResult } from './test-result';

export class BrowserTestResult extends TestResult {
  constructor(date: Date, private actionTestResults: ActionTestResult[]) {
    super(date);
  }

  public isReplayable(): boolean {
    for (const testResult of this.actionTestResults) {
      if (!testResult.isReplayable()) {
        return false;
      }
    }
    return true;
  }

  public getSuccessfulReplayCount(): number {
    let count: number = 0;
    for (const testResult of this.actionTestResults) {
      if (testResult.isReplayable()) {
        count++;
      }
    }
    return count;
  }
}

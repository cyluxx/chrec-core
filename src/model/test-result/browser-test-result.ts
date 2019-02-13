import { TestResult } from './test-result';
import { ActionTestResult } from './action-test-result';

export class BrowserTestResult extends TestResult {
  constructor(date: Date, private actionTestResults: ActionTestResult[]) {
    super(date);
  }

  isReplayable(): boolean {
    for (let testResult of this.actionTestResults) {
      if (!testResult.isReplayable()) {
        return false;
      }
    }
    return true;
  }

  getSuccessfulReplayCount(): number {
    let count: number = 0;
    for (let testResult of this.actionTestResults) {
      if(testResult.isReplayable()){
        count++;
      }
    }
    return count;
  }
}
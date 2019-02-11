import { TestResult } from './test-result';
import { BrowserTestResult } from './browser-test-result';

export class SequenceTestResult extends TestResult {
  constructor(date: Date, private browserTestResults: BrowserTestResult[]) {
    super(date);
  }

  isReplayable(): boolean {
    for (let testResult of this.browserTestResults) {
      if (!testResult.isReplayable()) {
        return false;
      }
    }
    return true;
  }
}

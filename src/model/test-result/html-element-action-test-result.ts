import { ActionTestResult } from './action-test-result';
import { LocatorTestResult } from './locator-test-result';

export class HtmlElementActionTestResult extends ActionTestResult {
  constructor(date: Date, private locatorTestResults: LocatorTestResult[]) {
    super(date);
  }

  public isReplayable(): boolean {
    for (const testResult of this.locatorTestResults) {
      if (testResult.isReplayable()) {
        return true;
      }
    }
    return false;
  }

  public getSuccessfulReplayCount(): number {
    let count: number = 0;
    for (const testResult of this.locatorTestResults) {
      if (testResult.isReplayable()) {
        count++;
      }
    }
    return count;
  }
}

import { ActionTestResult } from './action-test-result';
import { LocatorTestResult } from './locator-test-result';

export class HtmlElementActionTestResult extends ActionTestResult {
  constructor(date: Date, private locatorTestResults: LocatorTestResult[]) {
    super(date);
  }

  isReplayable(): boolean {
    for (let testResult of this.locatorTestResults) {
      if (testResult.isReplayable()) {
        return true;
      }
    }
    return false;
  }
}

import { HtmlElementAction } from '../action/html-element-action/html-element-action';
import { LocatorTestResult } from './locator-test-result';
import { TestResult } from './test-result';

export class HtmlElementActionTestResult extends TestResult {
  constructor(public action: HtmlElementAction, childTestResults: LocatorTestResult[]) {
    super(childTestResults);
  }

  public addChildTestResult(childTestResult: LocatorTestResult): void {
    this.childTestResults.push(childTestResult);
  }

  public isReplayable(): boolean {
    for (const testResult of this.childTestResults) {
      if (testResult.isReplayable()) {
        return true;
      }
    }
    return false;
  }
}

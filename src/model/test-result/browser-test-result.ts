import { Browser } from '../browser/browser';
import { ActionTestResult } from './action-test-result';
import { HtmlElementActionTestResult } from './html-element-action-test-result';
import { TestResult } from './test-result';

export class BrowserTestResult extends TestResult {
  constructor(public browser: Browser, childTestResults: Array<ActionTestResult | HtmlElementActionTestResult>) {
    super(childTestResults);
  }

  public addChildTestResult(childTestResults: ActionTestResult | HtmlElementActionTestResult): void {
    this.childTestResults.push(childTestResults);
  }

  public getSuccessfulActionCount(): number {
    let count: number = 0;
    for (const actionTestResult of this.childTestResults) {
      if (actionTestResult.isReplayable()) {
        count++;
      }
    }
    return count;
  }

  public getTotalActionCount(): number {
    return this.childTestResults.length;
  }
}

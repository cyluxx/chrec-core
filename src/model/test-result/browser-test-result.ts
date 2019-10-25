import { Browser } from '../browser/browser';
import { ActionTestResult } from './action-test-result';
import { HtmlElementActionTestResult } from './html-element-action-test-result';
import { TestResult } from './test-result';

export class BrowserTestResult extends TestResult {
  constructor(public browser: Browser, childTestResults: Array<ActionTestResult | HtmlElementActionTestResult>) {
    super(childTestResults);
  }

  public addChildTestResult(childTestResult: ActionTestResult | HtmlElementActionTestResult): void {
    this.childTestResults.push(childTestResult);
  }
}

import { Locator } from '../locator/locator';
import { Sequence } from '../sequence';
import { BrowserTestResult } from './browser-test-result';
import { TestResult } from './test-result';

export class SequenceTestResult extends TestResult {
  constructor(date: Date, public sequence: Sequence, childTestResults: BrowserTestResult[]) {
    super(date, childTestResults);
  }

  public addChildTestResult(childTestResult: BrowserTestResult): void {
    this.childTestResults.push(childTestResult);
  }
}

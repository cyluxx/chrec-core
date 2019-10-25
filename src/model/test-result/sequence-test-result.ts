import { Sequence } from '../sequence';
import { BrowserTestResult } from './browser-test-result';
import { TestResult } from './test-result';

export class SequenceTestResult extends TestResult {
  constructor(public sequence: Sequence, childTestResults: BrowserTestResult[]) {
    super(childTestResults);
  }

  public addChildTestResult(childTestResult: BrowserTestResult): void {
    this.childTestResults.push(childTestResult);
  }
}

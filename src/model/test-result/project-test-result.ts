import { Locator } from '../locator/locator';
import { SequenceTestResult } from './sequence-test-result';
import { TestResult } from './test-result';

export class ProjectTestResult extends TestResult {
  constructor(date: Date, childTestResults: SequenceTestResult[]) {
    super(date, childTestResults);
  }

  public addChildTestResult(childTestResult: SequenceTestResult): void {
    this.childTestResults.push(childTestResult);
  }
}

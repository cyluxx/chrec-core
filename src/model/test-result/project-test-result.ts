import { SequenceTestResult } from './sequence-test-result';
import { TestResult } from './test-result';

export class ProjectTestResult extends TestResult {
  constructor(public date: Date, childTestResults: SequenceTestResult[]) {
    super(childTestResults);
  }

  public addChildTestResult(childTestResult: SequenceTestResult): void {
    this.childTestResults.push(childTestResult);
  }
}

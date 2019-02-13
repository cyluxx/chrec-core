import { TestResult } from './test-result/test-result';

export abstract class Testable {
  constructor(protected testResults: TestResult[]) {}

  public isTested(): boolean {
    return this.testResults.length > 0;
  }

  public isReplayable(): boolean {
    return this.isTested() && this.testResults[this.testResults.length - 1].isReplayable();
  }
}

import { TestResult } from './test-result/test-result';

export abstract class Testable {
  constructor(private testResults: TestResult[]) {}

  protected isTested(): boolean {
    return this.testResults.length > 0;
  }

  protected isReplayable(): boolean {
    return this.testResults[this.testResults.length - 1].isReplayable();
  }
}

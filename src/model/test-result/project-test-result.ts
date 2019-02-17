import { SequenceTestResult } from './sequence-test-result';
import { TestResult } from './test-result';

export class ProjectTestResult extends TestResult {
  constructor(date: Date, private sequenceTestResults: SequenceTestResult[]) {
    super(date);
  }

  public getSequenceTestResults(): SequenceTestResult[] {
    return this.sequenceTestResults;
  }

  public isReplayable(): boolean {
    for (const testResult of this.sequenceTestResults) {
      if (!testResult.isReplayable()) {
        return false;
      }
    }
    return true;
  }

  public getSuccessfulLocatorCount(): number {
    let count: number = 0;
    for(const testResult of this.sequenceTestResults){
      count += testResult.getSuccessfulLocatorCount();
    }
    return count;
  }
  
  public getTotalLocatorCount(): number {
    let count: number = 0;
    for (const testResult of this.sequenceTestResults) {
      count += testResult.getTotalLocatorCount();
    }
    return count;
  }
}

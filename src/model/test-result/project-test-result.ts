import { TestResult } from './test-result';
import { SequenceTestResult } from './sequence-test-result';

export class ProjectTestResult extends TestResult {
  constructor(date: Date, private sequenceTestResults: SequenceTestResult[]) {
    super(date);
  }

  isReplayable(): boolean {
    for (let testResult of this.sequenceTestResults) {
      if (!testResult.isReplayable()) {
        return false;
      }
    }
    return true;
  }
}

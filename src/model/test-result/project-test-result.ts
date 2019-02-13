import { Project } from '../project';
import { SequenceTestResult } from './sequence-test-result';
import { TestResult } from './test-result';

export class ProjectTestResult extends TestResult {
  constructor(date: Date, private project: Project, private sequenceTestResults: SequenceTestResult[]) {
    super(date);
  }

  public isReplayable(): boolean {
    for (const testResult of this.sequenceTestResults) {
      if (!testResult.isReplayable()) {
        return false;
      }
    }
    return true;
  }

  public getSuccessfulReplayCount(): number {
    let count: number = 0;
    for (const testResult of this.sequenceTestResults) {
      if (testResult.isReplayable()) {
        count++;
      }
    }
    return count;
  }
}

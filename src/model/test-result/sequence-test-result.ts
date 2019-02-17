import { Sequence } from '../sequence';
import { BrowserTestResult } from './browser-test-result';
import { TestResult } from './test-result';

export class SequenceTestResult extends TestResult {
  constructor(date: Date, private sequence: Sequence, private browserTestResults: BrowserTestResult[]) {
    super(date);
  }

  public getSequence(): Sequence {
    return this.sequence;
  }

  public isReplayable(): boolean {
    for (const testResult of this.browserTestResults) {
      if (!testResult.isReplayable()) {
        return false;
      }
    }
    return true;
  }

  public getSuccessfulLocatorCount(): number {
    let count: number = 0;
    for(const testResult of this.browserTestResults){
      count += testResult.getSuccessfulLocatorCount();
    }
    return count;
  }
  
  public getTotalLocatorCount(): number {
    let count: number = 0;
    for (const testResult of this.browserTestResults) {
      count += testResult.getTotalLocatorCount();
    }
    return count;
  }
}

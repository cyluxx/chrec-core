import { BrowserTestResult } from './browser-test-result';
import { TestResult } from './test-result';

export class SequenceTestResult extends TestResult {
  constructor(date: Date, private browserTestResults: BrowserTestResult[]) {
    super(date);
  }

  public getBrowserTestResults(): BrowserTestResult[] {
    return this.browserTestResults;
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

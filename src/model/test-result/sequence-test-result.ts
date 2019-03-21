import { BrowserTestResult } from './browser-test-result';
import { TestResult } from './test-result';

export class SequenceTestResult implements TestResult {
  constructor(private date: Date, private browserTestResults: BrowserTestResult[]) { }

  public getDate(): Date {
    return this.date;
  }

  public addBrowserTestResult(browserTestResult: BrowserTestResult): void {
    this.browserTestResults.push(browserTestResult);
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
    for (const testResult of this.browserTestResults) {
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

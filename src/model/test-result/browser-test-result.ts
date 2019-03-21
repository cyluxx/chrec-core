import { Browser } from '../browser/browser';
import { ActionTestResult } from './action-test-result';
import { TestResult } from './test-result';

export class BrowserTestResult implements TestResult {
  constructor(private date: Date, private browser: Browser, private actionTestResults: ActionTestResult[]) {}
  public getDate(): Date {
    return this.date;
  }

  public getBrowser(): Browser {
    return this.browser;
  }

  public addActionTestResult(actionTestResult: ActionTestResult): void {
    this.actionTestResults.push(actionTestResult);
  }

  public getActionTestResults(): ActionTestResult[] {
    return this.actionTestResults;
  }

  public isReplayable(): boolean {
    for (const testResult of this.actionTestResults) {
      if (!testResult.isReplayable()) {
        return false;
      }
    }
    return true;
  }

  public getSuccessfulLocatorCount(): number {
    let count: number = 0;
    for (const testResult of this.actionTestResults) {
      count += testResult.getSuccessfulLocatorCount();
    }
    return count;
  }

  public getTotalLocatorCount(): number {
    let count: number = 0;
    for (const testResult of this.actionTestResults) {
      count += testResult.getTotalLocatorCount();
    }
    return count;
  }
}

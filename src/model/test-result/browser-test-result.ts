import { Browser } from '../browser/browser';
import { ActionTestResult } from './action-test-result';
import { TestResult } from './test-result';

export class BrowserTestResult extends TestResult {
  constructor(date: Date, private browser: Browser, private actionTestResults: ActionTestResult[]) {
    super(date);
  }

  public getBrowser(): Browser {
    return this.browser;
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
    for(const testResult of this.actionTestResults){
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

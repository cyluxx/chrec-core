import { Browser } from '../browser/browser';
import { Locator } from '../locator/locator';
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

  public getSuccessfulActionCount(): number {
    let count: number = 0;
    for (const actionTestResult of this.actionTestResults) {
      if (actionTestResult.isReplayable()) {
        count++;
      }
    }
    return count;
  }

  public getTotalActionCount(): number {
    return this.actionTestResults.length;
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

  public calculateBestLocatorMethods(): Locator[] {
    let locators: Locator[] = [];
    for (const testResult of this.actionTestResults) {
      locators = locators.concat(testResult.calculateBestLocatorMethods());
    }
    return locators;
  }

  public getSuccessfulCssSelectorGeneratorCount(): number {
    let count: number = 0;
    for (const testResult of this.actionTestResults) {
      count += testResult.getSuccessfulCssSelectorGeneratorCount();
    }
    return count;
  }

  public getSuccessfulFinderCount(): number {
    let count: number = 0;
    for (const testResult of this.actionTestResults) {
      count += testResult.getSuccessfulFinderCount();
    }
    return count;
  }

  public getSuccessfulGetQuerySelectorCount(): number {
    let count: number = 0;
    for (const testResult of this.actionTestResults) {
      count += testResult.getSuccessfulGetQuerySelectorCount();
    }
    return count;
  }

  public getSuccessfulOptimalSelectCount(): number {
    let count: number = 0;
    for (const testResult of this.actionTestResults) {
      count += testResult.getSuccessfulOptimalSelectCount();
    }
    return count;
  }

  public getSuccessfulSelectorQueryCount(): number {
    let count: number = 0;
    for (const testResult of this.actionTestResults) {
      count += testResult.getSuccessfulSelectorQueryCount();
    }
    return count;
  }

  public getSuccessfulRobulaPlusCount(): number {
    let count: number = 0;
    for (const testResult of this.actionTestResults) {
      count += testResult.getSuccessfulRobulaPlusCount();
    }
    return count;
  }
}

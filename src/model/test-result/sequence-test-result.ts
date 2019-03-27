import { Sequence } from '../sequence';
import { BrowserTestResult } from './browser-test-result';
import { TestResult } from './test-result';
import { Locator } from '../locator/locator';

export class SequenceTestResult implements TestResult {
  constructor(private date: Date, private sequence: Sequence, private browserTestResults: BrowserTestResult[]) {}

  public getDate(): Date {
    return this.date;
  }

  public getSequence(): Sequence {
    return this.sequence;
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

  public calculateBestLocatorMethods(): Locator[] {
    let locators: Locator[] = [];
    for (const testResult of this.browserTestResults) {
      locators = locators.concat(testResult.calculateBestLocatorMethods());
    }
    return locators;
  }

  public getSuccessfulCssSelectorGeneratorCount(): number {
    let count: number = 0;
    for (const testResult of this.browserTestResults) {
      count += testResult.getSuccessfulCssSelectorGeneratorCount();
    }
    return count;
  }

  public getSuccessfulFinderCount(): number {
    let count: number = 0;
    for (const testResult of this.browserTestResults) {
      count += testResult.getSuccessfulFinderCount();
    }
    return count;
  }

  public getSuccessfulGetQuerySelectorCount(): number {
    let count: number = 0;
    for (const testResult of this.browserTestResults) {
      count += testResult.getSuccessfulGetQuerySelectorCount();
    }
    return count;
  }

  public getSuccessfulOptimalSelectCount(): number {
    let count: number = 0;
    for (const testResult of this.browserTestResults) {
      count += testResult.getSuccessfulOptimalSelectCount();
    }
    return count;
  }

  public getSuccessfulSelectorQueryCount(): number {
    let count: number = 0;
    for (const testResult of this.browserTestResults) {
      count += testResult.getSuccessfulSelectorQueryCount();
    }
    return count;
  }

  public getSuccessfulRobulaPlusCount(): number {
    let count: number = 0;
    for (const testResult of this.browserTestResults) {
      count += testResult.getSuccessfulRobulaPlusCount();
    }
    return count;
  }
}

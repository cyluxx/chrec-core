import { HtmlElementAction } from '../action/html-element-action/html-element-action';
import { Locator } from '../locator/locator';
import { ActionTestResult } from './action-test-result';
import { LocatorTestResult } from './locator-test-result';
import { TestResult } from './test-result';

export class HtmlElementActionTestResult extends ActionTestResult implements TestResult {
  constructor(date: Date, action: HtmlElementAction, private locatorTestResults: LocatorTestResult[]) {
    super(date, action);
  }

  public getAction(): HtmlElementAction {
    return this.action as HtmlElementAction;
  }

  public addLocatorTestResult(locatorTestResult: LocatorTestResult): void {
    this.locatorTestResults.push(locatorTestResult);
  }

  public getLocatorTestResults(): LocatorTestResult[] {
    return this.locatorTestResults;
  }

  public isReplayable(): boolean {
    for (const testResult of this.locatorTestResults) {
      if (testResult.isReplayable()) {
        return true;
      }
    }
    return false;
  }

  public getSuccessfulLocatorCount(): number {
    let count: number = 0;
    for (const testResult of this.locatorTestResults) {
      count += testResult.getSuccessfulLocatorCount();
    }
    return count;
  }

  public getTotalLocatorCount(): number {
    let count: number = 0;
    for (const testResult of this.locatorTestResults) {
      count += testResult.getTotalLocatorCount();
    }
    return count;
  }

  public calculateBestLocatorMethods(): Locator[] {
    let locators: Locator[] = [];
    for (const testResult of this.locatorTestResults) {
      locators = locators.concat(testResult.calculateBestLocatorMethods());
    }
    return locators;
  }

  public getSuccessfulCssSelectorGeneratorCount(): number {
    let count: number = 0;
    for (const testResult of this.locatorTestResults) {
      count += testResult.getSuccessfulCssSelectorGeneratorCount();
    }
    return count;
  }

  public getSuccessfulFinderCount(): number {
    let count: number = 0;
    for (const testResult of this.locatorTestResults) {
      count += testResult.getSuccessfulFinderCount();
    }
    return count;
  }

  public getSuccessfulGetQuerySelectorCount(): number {
    let count: number = 0;
    for (const testResult of this.locatorTestResults) {
      count += testResult.getSuccessfulGetQuerySelectorCount();
    }
    return count;
  }

  public getSuccessfulOptimalSelectCount(): number {
    let count: number = 0;
    for (const testResult of this.locatorTestResults) {
      count += testResult.getSuccessfulOptimalSelectCount();
    }
    return count;
  }

  public getSuccessfulSelectorQueryCount(): number {
    let count: number = 0;
    for (const testResult of this.locatorTestResults) {
      count += testResult.getSuccessfulSelectorQueryCount();
    }
    return count;
  }

  public getSuccessfulRobulaPlusCount(): number {
    let count: number = 0;
    for (const testResult of this.locatorTestResults) {
      count += testResult.getSuccessfulRobulaPlusCount();
    }
    return count;
  }
}

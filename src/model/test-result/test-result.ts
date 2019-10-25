import { Locator } from 'selenium-webdriver';
import { Method } from '../locator/locator';

export abstract class TestResult {
  constructor(public childTestResults: TestResult[]) { }

  public abstract addChildTestResult(childTestResult: TestResult): void;

  public isReplayable(): boolean {
    for (const testResult of this.childTestResults) {
      if (!testResult.isReplayable()) {
        return false;
      }
    }
    return true;
  }

  public getSuccessfulLocatorCount(): number {
    let count: number = 0;
    for (const testResult of this.childTestResults) {
      count += testResult.getSuccessfulLocatorCount();
    }
    return count;
  }

  public getTotalLocatorCount(): number {
    let count: number = 0;
    for (const testResult of this.childTestResults) {
      count += testResult.getTotalLocatorCount();
    }
    return count;
  }

  public calculateBestLocatorMethods(): Locator[] {
    let locators: Locator[] = [];
    for (const testResult of this.childTestResults) {
      locators = locators.concat(testResult.calculateBestLocatorMethods());
    }
    return locators;
  }

  public getSpecificSuccessfulLocatorCount(method: Method): number {
    let count: number = 0;
    for (const testResult of this.childTestResults) {
      count += testResult.getSpecificSuccessfulLocatorCount(method);
    }
    return count;
  }
}

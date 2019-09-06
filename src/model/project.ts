import { Locator } from './locator/locator';
import { Sequence } from './sequence';
import { ProjectTestResult } from './test-result/project-test-result';

export class Project {
  constructor(public name: string, public sequences: Sequence[], public testResults: ProjectTestResult[]) {}

  public addTestResult(testResult: ProjectTestResult) {
    this.testResults.push(testResult);
  }

  public calculateBestLocatorMethods(): Locator[] {
    let locators: Locator[] = [];
    for (const testResult of this.testResults) {
      locators = locators.concat(testResult.calculateBestLocatorMethods());
    }
    return locators;
  }

  public getSuccessfulCssSelectorGeneratorCount(): number {
    let count: number = 0;
    for (const testResult of this.testResults) {
      count += testResult.getSuccessfulCssSelectorGeneratorCount();
    }
    return count;
  }

  public getSuccessfulFinderCount(): number {
    let count: number = 0;
    for (const testResult of this.testResults) {
      count += testResult.getSuccessfulFinderCount();
    }
    return count;
  }

  public getSuccessfulGetQuerySelectorCount(): number {
    let count: number = 0;
    for (const testResult of this.testResults) {
      count += testResult.getSuccessfulGetQuerySelectorCount();
    }
    return count;
  }

  public getSuccessfulOptimalSelectCount(): number {
    let count: number = 0;
    for (const testResult of this.testResults) {
      count += testResult.getSuccessfulOptimalSelectCount();
    }
    return count;
  }

  public getSuccessfulSelectorQueryCount(): number {
    let count: number = 0;
    for (const testResult of this.testResults) {
      count += testResult.getSuccessfulSelectorQueryCount();
    }
    return count;
  }

  public getSuccessfulRobulaPlusCount(): number {
    let count: number = 0;
    for (const testResult of this.testResults) {
      count += testResult.getSuccessfulRobulaPlusCount();
    }
    return count;
  }
}

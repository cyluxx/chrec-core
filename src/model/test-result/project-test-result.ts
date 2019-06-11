import { Locator } from '../locator/locator';
import { SequenceTestResult } from './sequence-test-result';
import { TestResult } from './test-result';

export class ProjectTestResult implements TestResult {
  constructor(private date: Date, private sequenceTestResults: SequenceTestResult[]) {}

  public getDate(): Date {
    return this.date;
  }

  public addSequenceTestResult(sequenceTestResult: SequenceTestResult): void {
    this.sequenceTestResults.push(sequenceTestResult);
  }

  public getSequenceTestResults(): SequenceTestResult[] {
    return this.sequenceTestResults;
  }

  public isReplayable(): boolean {
    for (const testResult of this.sequenceTestResults) {
      if (!testResult.isReplayable()) {
        return false;
      }
    }
    return true;
  }

  public getSuccessfulLocatorCount(): number {
    let count: number = 0;
    for (const testResult of this.sequenceTestResults) {
      count += testResult.getSuccessfulLocatorCount();
    }
    return count;
  }

  public getTotalLocatorCount(): number {
    let count: number = 0;
    for (const testResult of this.sequenceTestResults) {
      count += testResult.getTotalLocatorCount();
    }
    return count;
  }

  public calculateBestLocatorMethods(): Locator[] {
    let locators: Locator[] = [];
    for (const testResult of this.sequenceTestResults) {
      locators = locators.concat(testResult.calculateBestLocatorMethods());
    }
    return locators;
  }

  public getSuccessfulCssSelectorGeneratorCount(): number {
    let count: number = 0;
    for (const testResult of this.sequenceTestResults) {
      count += testResult.getSuccessfulCssSelectorGeneratorCount();
    }
    return count;
  }

  public getSuccessfulFinderCount(): number {
    let count: number = 0;
    for (const testResult of this.sequenceTestResults) {
      count += testResult.getSuccessfulFinderCount();
    }
    return count;
  }

  public getSuccessfulGetQuerySelectorCount(): number {
    let count: number = 0;
    for (const testResult of this.sequenceTestResults) {
      count += testResult.getSuccessfulGetQuerySelectorCount();
    }
    return count;
  }

  public getSuccessfulOptimalSelectCount(): number {
    let count: number = 0;
    for (const testResult of this.sequenceTestResults) {
      count += testResult.getSuccessfulOptimalSelectCount();
    }
    return count;
  }

  public getSuccessfulSelectorQueryCount(): number {
    let count: number = 0;
    for (const testResult of this.sequenceTestResults) {
      count += testResult.getSuccessfulSelectorQueryCount();
    }
    return count;
  }

  public getSuccessfulRobulaPlusCount(): number {
    let count: number = 0;
    for (const testResult of this.sequenceTestResults) {
      count += testResult.getSuccessfulRobulaPlusCount();
    }
    return count;
  }
}

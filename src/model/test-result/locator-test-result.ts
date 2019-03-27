import { Locator } from '../locator/locator';
import { TestResult } from './test-result';

export class LocatorTestResult implements TestResult {
  constructor(private date: Date, private locator: Locator, private valid: boolean) {}
  public getDate(): Date {
    return this.date;
  }

  public getLocator(): Locator {
    return this.locator;
  }

  public isReplayable(): boolean {
    return this.valid;
  }

  public getSuccessfulLocatorCount(): number {
    return this.valid ? 1 : 0;
  }

  public getTotalLocatorCount(): number {
    return 1;
  }

  public calculateBestLocatorMethods(): Locator[] {
    return this.valid ? [this.locator] : [];
  }

  public getSuccessfulCssSelectorGeneratorCount(): number {
    return this.valid && this.locator.getMethodName() === 'CssSelectorGenerator' ? 1 : 0;
  }

  public getSuccessfulFinderCount(): number {
    return this.valid && this.locator.getMethodName() === 'Finder' ? 1 : 0;
  }

  public getSuccessfulGetQuerySelectorCount(): number {
    return this.valid && this.locator.getMethodName() === 'GetQuerySelector' ? 1 : 0;
  }

  public getSuccessfulOptimalSelectCount(): number {
    return this.valid && this.locator.getMethodName() === 'OptimalSelect' ? 1 : 0;
  }

  public getSuccessfulSelectorQueryCount(): number {
    return this.valid && this.locator.getMethodName() === 'SelectorQuery' ? 1 : 0;
  }

  public getSuccessfulRobulaPlusCount(): number {
    return this.valid && this.locator.getMethodName() === 'RobulaPlus' ? 1 : 0;
  }
}

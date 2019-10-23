import { Locator, Method } from '../locator/locator';
import { TestResult } from './test-result';

export class LocatorTestResult extends TestResult {
  constructor(date: Date, public locator: Locator, public valid: boolean) {
    super(date, [])
  }

  public addChildTestResult(childTestResult: TestResult): void {
    throw new Error(`Internal: Do not add a childTestResult to LocatorTestResult`);
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
    return this.valid && this.locator.method === Method.CSS_SELECTOR_GENERATOR ? 1 : 0;
  }

  public getSuccessfulFinderCount(): number {
    return this.valid && this.locator.method === Method.FINDER ? 1 : 0;
  }

  public getSuccessfulGetQuerySelectorCount(): number {
    return this.valid && this.locator.method === Method.GET_QUERY_SELECTOR ? 1 : 0;
  }

  public getSuccessfulOptimalSelectCount(): number {
    return this.valid && this.locator.method === Method.OPTIMAL_SELECT ? 1 : 0;
  }

  public getSuccessfulSelectorQueryCount(): number {
    return this.valid && this.locator.method === Method.SELECTOR_QUERY ? 1 : 0;
  }

  public getSuccessfulRobulaPlusCount(): number {
    return this.valid && this.locator.method === Method.ROBULA_PLUS ? 1 : 0;
  }
}

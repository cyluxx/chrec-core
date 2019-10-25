import { Locator, Method } from '../locator/locator';
import { TestResult } from './test-result';

export class LocatorTestResult extends TestResult {
  constructor(public locator: Locator, public valid: boolean) {
    super([]);
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

  public getSpecificSuccessfulLocatorCount(method: Method): number {
    return this.valid && this.locator.method === method ? 1 : 0;
  }
}

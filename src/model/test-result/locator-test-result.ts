import { Locator } from '../locator/locator';
import { TestResult } from './test-result';

export class LocatorTestResult extends TestResult {
  constructor(date: Date, private locator: Locator, private valid: boolean) {
    super(date);
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
}

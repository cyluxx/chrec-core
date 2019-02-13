import { Locator } from '../locator/locator';
import { TestResult } from './test-result';

export class LocatorTestResult extends TestResult {
  constructor(date: Date, private locator: Locator, private valid: boolean) {
    super(date);
  }

  public isReplayable(): boolean {
    return this.valid;
  }

  public getSuccessfulReplayCount(): number {
    if (this.valid) {
      return 1;
    }
    return 0;
  }
}

import { TestResult } from './test-result';

export class LocatorTestResult extends TestResult {
  constructor(date: Date, private valid: boolean) {
    super(date);
  }

  isReplayable(): boolean{
    return this.valid;
  }
}

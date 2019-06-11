import { Action } from '../action/action';
import { Locator } from '../locator/locator';
import { TestResult } from './test-result';

export class ActionTestResult implements TestResult {
  private valid: boolean;

  constructor(private date: Date, protected action: Action, valid?: boolean) {
    this.valid = false;
    if (valid) {
      this.valid = valid;
    }
  }

  public getDate(): Date {
    return this.date;
  }

  public getAction(): Action {
    return this.action;
  }

  public isReplayable(): boolean {
    return this.valid;
  }

  public getSuccessfulLocatorCount(): number {
    return 0;
  }

  public getTotalLocatorCount(): number {
    return 0;
  }

  public calculateBestLocatorMethods(): Locator[] {
    return [];
  }

  public getSuccessfulCssSelectorGeneratorCount(): number {
    return 0;
  }

  public getSuccessfulFinderCount(): number {
    return 0;
  }

  public getSuccessfulGetQuerySelectorCount(): number {
    return 0;
  }

  public getSuccessfulOptimalSelectCount(): number {
    return 0;
  }

  public getSuccessfulSelectorQueryCount(): number {
    return 0;
  }

  public getSuccessfulRobulaPlusCount(): number {
    return 0;
  }
}

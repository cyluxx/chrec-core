import { Locator } from '../locator/locator';

export interface TestResult {
  getDate(): Date;

  isReplayable(): boolean;

  getSuccessfulLocatorCount(): number;

  getTotalLocatorCount(): number;

  calculateBestLocatorMethods(): Locator[];

  getSuccessfulCssSelectorGeneratorCount(): number;

  getSuccessfulFinderCount(): number;

  getSuccessfulGetQuerySelectorCount(): number;

  getSuccessfulOptimalSelectCount(): number;

  getSuccessfulSelectorQueryCount(): number;

  getSuccessfulRobulaPlusCount(): number;
}

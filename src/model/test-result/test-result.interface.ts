import { Locator } from '../locator/locator';

export interface TestResult {

  date: Date;

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

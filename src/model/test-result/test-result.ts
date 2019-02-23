export interface TestResult {
  getDate(): Date;

  isReplayable(): boolean;

  getSuccessfulLocatorCount(): number;

  getTotalLocatorCount(): number;
}

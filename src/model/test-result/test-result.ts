export abstract class TestResult {
  constructor(private date: Date) {}

  public getDate(): Date {
    return this.date;
  }

  public abstract isReplayable(): boolean;

  public abstract getSuccessfulLocatorCount(): number;

  public abstract getTotalLocatorCount(): number;
}

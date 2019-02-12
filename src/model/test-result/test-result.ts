export abstract class TestResult {
  constructor(private date: Date) {}

  abstract isReplayable(): boolean;

  abstract getSuccessfulReplayCount(): number;

  getDate(): Date {
    return this.date;
  }
}

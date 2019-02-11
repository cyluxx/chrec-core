export abstract class TestResult {
  constructor(private date: Date) {}

  abstract isReplayable(): boolean;
}

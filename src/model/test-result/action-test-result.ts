import { TestResult } from './test-result';

export class ActionTestResult extends TestResult {
  private valid: boolean;

  constructor(date: Date, valid?: boolean) {
    super(date);
    
    this.valid = false;
    if(valid){
      this.valid = valid;
    }
  }

  isReplayable(): boolean {
    return this.valid;
  }

  getSuccessfulReplayCount(): number {
    if(this.valid){
      return 1;
    }
    return 0;
  }
}

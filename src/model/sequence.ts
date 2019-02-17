import { Action } from './action/action';
import { SequenceTestResult } from './test-result/sequence-test-result';

export class Sequence {
  constructor(private name: string, private actions: Action[], private sequenceTestResults: SequenceTestResult[]) {}

  public getActions(): Action[] {
    return this.actions;
  }

  public addTestResult(testResult: SequenceTestResult){
    this.sequenceTestResults.push(testResult);
  }

  public getTestResults(): SequenceTestResult[] {
    return this.sequenceTestResults;
  }
}

import { Action } from './action/action';
import { SequenceTestResult } from './test-result/sequence-test-result';
import { Testable } from './testable';

export class Sequence extends Testable{
  constructor(private name: string, private actions: Action[], testResults: SequenceTestResult[]) {
    super(testResults);
  }
}

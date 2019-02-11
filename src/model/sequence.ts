import { Action } from './action/action';
import { SequenceTestResult } from './test-result/sequence-test-result';

export class Sequence {
  constructor(private name: string, private actions: Action[], private testResults: SequenceTestResult[]) {}
}

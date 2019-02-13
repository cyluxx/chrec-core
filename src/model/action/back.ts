import { ActionTestResult } from '../test-result/action-test-result';
import { Action } from './action';

export class Back extends Action {
  constructor(image: string, testResults: ActionTestResult[]) {
    super(image, testResults);
  }
}

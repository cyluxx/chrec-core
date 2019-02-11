import { Action } from './action';
import { ActionTestResult } from '../test-result/action-test-result';

export class Refresh extends Action {
  constructor(image: string, testResults: ActionTestResult[]) {
    super(image, testResults);
  }
}

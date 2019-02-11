import { Action } from './action';
import { ActionTestResult } from '../test-result/action-test-result';

export class GoTo extends Action {
  constructor(image: string, private url: string, testResults: ActionTestResult[]) {
    super(image, testResults);
    this.url = url;
  }
}

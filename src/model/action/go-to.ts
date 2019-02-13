import { ActionTestResult } from '../test-result/action-test-result';
import { Action } from './action';

export class GoTo extends Action {
  constructor(image: string, private url: string, testResults: ActionTestResult[]) {
    super(image, testResults);
    this.url = url;
  }
}

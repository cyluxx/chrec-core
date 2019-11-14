import { Action } from '../action';
import { BrowserActionTestResult } from '../action-test-result/browser-action-test-result';

export abstract class BrowserAction extends Action {
  constructor(testResults: BrowserActionTestResult[], image: string) {
    super(testResults, image);
  }
}
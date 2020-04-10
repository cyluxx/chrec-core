import { ActionTestResult } from '../action-test-result';
import { Browser } from '../browser';

export class BrowserActionTestResult extends ActionTestResult {
  constructor(browser: Browser, public replayable: boolean, id?: string) {
    super(browser, id);
  }
}

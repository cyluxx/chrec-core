import { Browser } from './browser';
import { BrowserTestResult } from '../test-result/browser-test-result';

export class Chrome extends Browser {
  constructor(
    name: string,
    width: number,
    height: number,
    private headless: boolean,
    testResults: BrowserTestResult[],
  ) {
    super(name, width, height, testResults);
  }
}

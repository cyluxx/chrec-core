import { BrowserTestResult } from '../test-result/browser-test-result';
import { Browser } from './browser';

export class Firefox extends Browser {
  constructor(name: string, width: number, height: number, testResults: BrowserTestResult[]) {
    super(name, width, height, testResults);
  }
}

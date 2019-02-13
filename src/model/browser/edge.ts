import { Browser } from './browser';
import { BrowserTestResult } from '../test-result/browser-test-result';

export class Edge extends Browser {
  constructor(name: string, width: number, height: number, testResults: BrowserTestResult[]) {
    super(name, width, height, testResults);
  }
}
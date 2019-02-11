import { BrowserTestResult } from '../test-result/browser-test-result';

export abstract class Browser {
  constructor(
    private name: string,
    private width: number,
    private height: number,
    private testResults: BrowserTestResult[],
  ) {}
}

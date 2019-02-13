import { BrowserTestResult } from '../test-result/browser-test-result';
import { Testable } from '../testable';

export abstract class Browser extends Testable {
  constructor(
    private name: string,
    private width: number,
    private height: number,
    testResults: BrowserTestResult[],
  ) {
    super(testResults);
  }
}

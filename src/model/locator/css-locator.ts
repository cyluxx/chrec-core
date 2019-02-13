import { LocatorTestResult } from '../test-result/locator-test-result';
import { Locator } from './locator';

export class CssLocator extends Locator {
  constructor(methodName: string, value: string, testResults: LocatorTestResult[]) {
    super(methodName, value, testResults);
  }
}

import { Locator } from './locator';
import { LocatorTestResult } from '../test-result/locator-test-result';

export class XpathLocator extends Locator {
  constructor(methodName: string, value: string, testResults: LocatorTestResult[]) {
    super(methodName, value, testResults);
  }
}

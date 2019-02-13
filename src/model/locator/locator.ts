import { LocatorTestResult } from '../test-result/locator-test-result';
import { Testable } from '../testable';

export abstract class Locator extends Testable{
  constructor(private methodName: string, private value: string, testResults: LocatorTestResult[]) {
    super(testResults);
  }
}

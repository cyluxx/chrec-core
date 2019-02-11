import { LocatorTestResult } from '../test-result/locator-test-result';

export abstract class Locator {
  constructor(private methodName: string, private value: string, private testResults: LocatorTestResult[]) {}
}

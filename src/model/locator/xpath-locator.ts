import { Locator } from './locator';

export class XpathLocator extends Locator {
  constructor(methodName: string, value: string) {
    super(methodName, value);
  }
}

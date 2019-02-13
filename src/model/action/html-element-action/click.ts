import { Locator } from '../../locator/locator';
import { HtmlElementAction } from './html-element-action';
import { HtmlElementActionTestResult } from '../../test-result/html-element-action-test-result';

export class Click extends HtmlElementAction {
  constructor(image: string, locators: Locator[], boundingBox: DOMRect, testResults: HtmlElementActionTestResult[]) {
    super(image, locators, boundingBox, testResults);
  }
}
import { Locator } from '../../locator/locator';
import { HtmlElementActionTestResult } from '../../test-result/html-element-action-test-result';
import { Action } from '../action';

export abstract class HtmlElementAction extends Action {
  constructor(image: string, private locators: Locator[], private boundingBox: DOMRect) {
    super(image);
  }
}

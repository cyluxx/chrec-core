import { WebDriver } from 'selenium-webdriver';
import { Action as AlexAction } from '../../export/alex/action';
import { Action } from './action';

export class SwitchToDefaultContext extends Action {
  constructor(image: string) {
    super(image);
  }

  public async test(driver: WebDriver): Promise<void> {
    await driver.switchTo().defaultContent();
  }

  public toAlexActions(): AlexAction[] {
    throw new Error('Not implemented yet');
  }
}

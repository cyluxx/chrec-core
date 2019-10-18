import { WebDriver } from 'selenium-webdriver';
import { WebBrowser } from '../../export/alex/action';
import { Action } from './action';

export class Refresh extends Action {
  constructor(image: string) {
    super(image);
  }

  public async test(driver: WebDriver): Promise<void> {
    await driver.navigate().refresh();
  }

  public toAlexActions(): WebBrowser[] {
    return [new WebBrowser('REFRESH')];
  }
}

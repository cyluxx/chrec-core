import { WebDriver } from 'selenium-webdriver';
import { WebBrowser } from '../../export/alex/action';
import { Action } from './action';

export class Forward extends Action {
  constructor(image: string) {
    super(image);
  }

  public async test(driver: WebDriver): Promise<void> {
    await driver.navigate().forward();
  }

  public toAlexActions(): WebBrowser[] {
    throw new Error('Export Error: Alex does not support Forward Action!');
  }
}

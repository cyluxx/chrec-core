import { WebDriver } from 'selenium-webdriver';
import { Action } from './action';
import { Settings } from './settings';
import { Identificable } from './identififable';

export class Sequence extends Identificable {
  constructor(public name: string, public actions: Action[]) {
    super();
  }

  public addAction(action: Action): void {
    this.actions.push(action);
  }

  public async test(settings: Settings) {
    for (const browser of settings.browsers) {
      const driver: WebDriver = await browser.buildWebDriver(settings.seleniumServerUrl);
      for (const action of this.actions) {
        if (browser.sleepMsBetweenActions) {
          await driver.sleep(browser.sleepMsBetweenActions);
        }
        await action.test(browser, driver);
      }
      await driver.quit();
    }
  }
}

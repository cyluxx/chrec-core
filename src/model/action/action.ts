import { WebDriver } from 'selenium-webdriver';
import { Action as AlexAction } from '../../export/alex/action';
import { Status } from '../status';

export abstract class Action {
  constructor(private className: string, private image: string) {}

  public getClassName(): string {
    return this.className;
  }

  public getImage(): string {
    return this.image;
  }

  public setImage(image: string) {
    this.image = image;
  }

  public abstract async run(driver: WebDriver): Promise<Status>;

  public abstract toAlexActions(): AlexAction[];
}

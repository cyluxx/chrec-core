import { WebDriver } from 'selenium-webdriver';

export abstract class Browser {
  constructor(
    private className: string,
    private name: string,
    protected width: number,
    protected height: number,
    protected sleepMsBetweenActions: number,
    protected iterationCount: number,
  ) {}

  public getClassName(): string {
    return this.className;
  }

  public getName(): string {
    return this.name;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public getSleepMsBetweenActions(): number {
    return this.sleepMsBetweenActions;
  }

  public getIterationCount(): number {
    return this.iterationCount;
  }

  public abstract buildWebDriver(seleniumServerUrl: string): WebDriver;
}

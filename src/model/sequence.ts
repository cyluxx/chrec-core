import { Action } from './action/action';

export class Sequence {
  constructor(private name: string, private actions: Action[]) {}

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public addAction(action: Action): void {
    this.actions.push(action);
  }

  public getActions(): Action[] {
    return this.actions;
  }
}

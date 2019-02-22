import { Step } from './step';

export class Symbol {
  public description: string = '';
  public expectedResult: string = '';
  public successOutput = null;
  public inputs = [];
  public outputs = [];

  constructor(public name: string, public steps: Step[]) {
    this.name = name;
    this.steps = steps;
  }
}

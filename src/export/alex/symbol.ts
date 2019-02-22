import { Step } from './step';

export class Symbol {
  private description: string = '';
  private expectedResult: string = '';
  private successOutput = null;
  private inputs = [];
  private outputs = [];

  constructor(private name: string, private steps: Step[]) {
    this.name = name;
    this.steps = steps;
  }
}

import { Symbol as AlexSymbol } from './symbol';

export class SymbolGroup {
  public parent = null;
  public groups = [];

  constructor(public name: string, public symbols: AlexSymbol[]) {
    this.name = name + ' (ChRec import)';
  }
}

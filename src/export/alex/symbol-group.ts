import { Symbol as AlexSymbol } from './symbol';

export class SymbolGroup {
  private name: string = 'ChRec Imports';
  private parent = null;
  private symbols: AlexSymbol[] = [];
  private groups = [];

  constructor(symbols: AlexSymbol[]) {
    this.symbols = symbols;
  }
}

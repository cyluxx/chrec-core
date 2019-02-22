import { SymbolGroup } from './symbol-group';

export class AlexExport {
  public version: string = '1.6.1';
  public type: string = 'symbolGroups';
  public symbolGroups: SymbolGroup[] = [];

  constructor(symbolGroup: SymbolGroup) {
    this.symbolGroups.push(symbolGroup);
  }
}

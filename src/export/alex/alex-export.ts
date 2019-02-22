import { SymbolGroup } from './symbol-group';

export class AlexExport {
  private version: string = '1.6.1';
  private type: string = 'symbolGroups';
  private symbolGroups: SymbolGroup[] = [];

  constructor(symbolGroup: SymbolGroup) {
    this.symbolGroups.push(symbolGroup);
  }
}

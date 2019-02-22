export class AlexExport {
  version: string = '1.6.1';
  type: string = 'symbolGroups';
  symbolGroups: SymbolGroup[] = [];

  constructor(symbolGroup: SymbolGroup) {
    this.symbolGroups.push(symbolGroup);
  }
}

export class SymbolGroup {
  name: string = 'Default group';
  parent = null;
  symbols: Symbol[] = [];
  groups = [];

  constructor(symbols: Symbol[]) {
    this.symbols = symbols;
  }
}

export class Symbol {
  name: string;
  description: string = '';
  expectedResult: string = '';
  successOutput = null;
  inputs = [];
  outputs = [];
  steps: Step[] = [];

  constructor(name: string, steps: Step[]) {
    this.name = name;
    this.steps = steps;
  }
}

export class Step {
  type: string = 'action';
  disabled: boolean = false;
  ignoreFailure: boolean = false;
  negated: boolean = false;
  errorOutput = null;
  action: Action;
  position: number;

  constructor(action: Action, position: number) {
    this.action = action;
    this.position = position;
  }
}

export abstract class Action {
  constructor(private type: string) {}
}

export class WebFill extends Action {
  constructor(private value: string, private node: Node) {
    super('web_fill');
  }
}

export class WebCheckForText extends Action {
  constructor(private value: string, private node: Node, private regexp: boolean = false) {
    super('web_checkForText');
  }
}

export class WebClick extends Action {
  constructor(private node: Node, private doubleClick: boolean = false) {
    super('web_click');
  }
}

export class WebGoTo extends Action {
  constructor(private url: string, private credentials: object = { name: '', password: '' }) {
    super('web_goto');
  }
}

export class WebBrowser extends Action {
  constructor(private action: string) {
    super('web_browser');
  }
}

export class Node {
  selector: string;
  type: NodeType;

  constructor(selector: string, type: NodeType) {
    this.selector = selector;
    this.type = type;
  }
}

export enum NodeType {
  CSS = 'CSS',
  XPATH = 'XPATH',
}

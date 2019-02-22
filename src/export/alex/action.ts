import { Node } from './node';

/* tslint:disable:max-classes-per-file */

export abstract class Action {
  constructor(public type: string) {}
}

export class WebFill extends Action {
  constructor(public value: string, public node: Node) {
    super('web_fill');
  }
}

export class WebCheckForText extends Action {
  public regexp: boolean = false;

  constructor(public value: string, public node: Node) {
    super('web_checkForText');
  }
}

export class WebClick extends Action {
  public doubleClick: boolean = false;

  constructor(public node: Node) {
    super('web_click');
  }
}

export class WebGoTo extends Action {
  public credentials: object = { name: '', password: '' };

  constructor(public url: string) {
    super('web_goto');
  }
}

export class WebBrowser extends Action {
  constructor(public action: string) {
    super('web_browser');
  }
}

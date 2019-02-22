import { Node } from './node';

/* tslint:disable:max-classes-per-file */

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

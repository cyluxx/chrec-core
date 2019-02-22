export class Node {
  constructor(public selector: string, public type: NodeType) {
    this.selector = selector;
    this.type = type;
  }
}

export enum NodeType {
  CSS = 'CSS',
  XPATH = 'XPATH',
}

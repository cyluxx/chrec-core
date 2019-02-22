export class Node {
  constructor(private selector: string, private type: NodeType) {
    this.selector = selector;
    this.type = type;
  }
}

export enum NodeType {
  CSS = 'CSS',
  XPATH = 'XPATH',
}

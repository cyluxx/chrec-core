/**
 * This class just exists, because Microsoft-Browsers and Typescript do not implement the common DOMRect object.
 */
export class BoundingBox {
  constructor(public x: number, public y: number, public width: number, public height: number) {}

  public fromDOMRect(domRect: DOMRect) {
    this.x = domRect.x;
    this.y = domRect.y;
    this.width = domRect.width;
    this.height = domRect.height;
  }
}

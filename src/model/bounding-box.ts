/**
 * This class just exists, because Microsoft-Browsers and Typescript do not implement the common DOMRect object.
 */
export class BoundingBox {
  public static fromDOMRect(domRect: DOMRect): BoundingBox {
    return new BoundingBox(domRect.x, domRect.y, domRect.width, domRect.height);
  }

  constructor(public x: number, public y: number, public width: number, public height: number) { }
}

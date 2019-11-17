import { BoundingBox } from '../../../model/bounding-box';

describe('BoundingBox', () => {
  describe('fromDOMRect', () => {
    test('when valid DOMRect, then return valid BoundingBox', () => {
      const boundingBox = BoundingBox.fromDOMRect({ x: 1, y: 2, width: 3, height: 4 } as DOMRect);
      expect(boundingBox).toEqual(new BoundingBox(1, 2, 3, 4));
    });
  });
});

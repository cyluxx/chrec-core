import { Clear } from '../../../model/action/html-element-action/clear';
import { Refresh } from '../../../model/action/refresh';
import { BoundingBox } from '../../../model/bounding-box';
import { Sequence } from '../../../model/sequence';

describe('Sequence', () => {
  describe('addAction', () => {
    test('when Action a, then return list of Actions with a appended to the end', () => {
      const action = new Refresh('foo');
      const sequence = new Sequence('bar', [action]);
      sequence.addAction(new Clear('baz', [], new BoundingBox(42, 42, 42, 42)));

      expect(sequence.actions).toEqual(
        [new Refresh('foo'), new Clear('baz', [], new BoundingBox(42, 42, 42, 42))]
      );
    })
  })
});

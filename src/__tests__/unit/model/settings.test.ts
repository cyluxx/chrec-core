import { Chrome } from '../../../model/browser/chrome';
import { Edge } from '../../../model/browser/edge';
import { Settings } from '../../../model/settings';

describe('Settings', () => {
  describe('addBrowser', () => {
    test('when Browser b, then return list of Browsers with b appended to the end', () => {
      const browser = new Chrome('foo', 42, 42, 42, false);
      const settings = new Settings('bar', [browser]);
      settings.addBrowser(new Edge('baz', 42, 42, 42));

      expect(settings.browsers).toEqual(
        [new Chrome('foo', 42, 42, 42, false), new Edge('baz', 42, 42, 42)]
      );
    })
  })
});
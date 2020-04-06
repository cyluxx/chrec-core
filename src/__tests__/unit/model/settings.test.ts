import { Chrome } from '../../../model/browser/chrome';
import { Edge } from '../../../model/browser/edge';
import { Settings } from '../../../model/settings';

describe('Settings', () => {
  describe('addBrowser', () => {
    test('when Browser b, then return list of Browsers with b appended to the end', () => {
      const chrome = new Chrome('foo', 42, 42, 42);
      const edge = new Edge('baz', 42, 42, 42);
      const settings = new Settings('bar', [chrome]);
      settings.addBrowser(edge);

      expect(settings.browsers).toEqual([chrome, edge]);
    });
  });
});

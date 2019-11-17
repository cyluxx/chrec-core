import { WebDriver } from 'selenium-webdriver';
import { instance, mock, verify, when } from 'ts-mockito';
import { Mocker } from 'ts-mockito/lib/Mock'
import { Refresh } from '../../../model/action/browser-action/refresh';
import { Clear } from '../../../model/action/html-element-action/clear';
import { BoundingBox } from '../../../model/bounding-box';
import { Edge } from '../../../model/browser/edge';
import { Sequence } from '../../../model/sequence';
import { Settings } from '../../../model/settings';

// Workaround for Issue: https://github.com/NagRock/ts-mockito/issues/163
/* tslint:disable-next-line */
function betterMock<T>(clazz?: (new (...args: any[]) => T) | (Function & { prototype: T })): T {
  const mocker = new Mocker(clazz);
  /* tslint:disable-next-line */
  mocker['excludedPropertyNames'] = ['hasOwnProperty', 'then'];
  return mocker.getMock();
}

describe('Sequence', () => {
  describe('addAction', () => {
    test('when Action a, then return list of Actions with a appended to the end', () => {
      const action = new Refresh([], 'foo');
      const sequence = new Sequence('bar', [action]);
      sequence.addAction(new Clear([], 'baz', [], new BoundingBox(42, 42, 42, 42)));

      expect(sequence.actions).toEqual(
        [new Refresh([], 'foo'), new Clear([], 'baz', [], new BoundingBox(42, 42, 42, 42))]
      );
    })
  })

  describe('test', () => {
    test('verify driver is build and actions are tested and driver quits', async () => {
      const mockedDriver: WebDriver = betterMock();
      when(mockedDriver.sleep(42)).thenResolve();
      when(mockedDriver.quit()).thenResolve();
      const driver = instance(mockedDriver);

      const mockedBrowser: Edge = mock(Edge);
      when(mockedBrowser.sleepMsBetweenActions).thenReturn(42);
      when(mockedBrowser.buildWebDriver('foo')).thenResolve(driver);
      const browser = instance(mockedBrowser);

      const mockedSettings: Settings = mock(Settings);
      when(mockedSettings.seleniumServerUrl).thenReturn('foo');
      when(mockedSettings.browsers).thenReturn([browser]);
      const settings = instance(mockedSettings);

      const mockedAction: Refresh = mock(Refresh);
      when(mockedAction.test(browser, driver)).thenResolve();
      const action = instance(mockedAction);

      const sequence = new Sequence('foo', [action]);

      await sequence.test(settings);

      verify(mockedBrowser.buildWebDriver('foo')).once();
      verify(mockedBrowser.sleepMsBetweenActions).twice();
      verify(mockedDriver.sleep(42)).once();
      verify(mockedAction.test(browser, driver)).once();
      verify(mockedDriver.quit()).once();
    })
  })
});

import { Refresh } from "../../model/action/refresh";
import { Edge } from "../../model/browser/edge"
import { ActionTestResult } from "../../model/test-result/action-test-result";
import { BrowserTestResult } from "../../model/test-result/browser-test-result";

test('ActionTestResult isReplayable', () => {
  const action: Refresh = new Refresh('foo');
  const truthyTestResult: ActionTestResult = new ActionTestResult(new Date(), action, true);
  const falsyTestResult: ActionTestResult = new ActionTestResult(new Date(), action, false);

  expect(truthyTestResult.isReplayable()).toBe(true);
  expect(falsyTestResult.isReplayable()).toBe(false);
});

test('ActionTestResult getSuccessfullReplayCount', () => {
  const action: Refresh = new Refresh('foo');
  const truthyTestResult: ActionTestResult = new ActionTestResult(new Date(), action, true);
  const falsyTestResult: ActionTestResult = new ActionTestResult(new Date(), action, false);

  expect(truthyTestResult.getSuccessfulReplayCount()).toBe(1);
  expect(falsyTestResult.getSuccessfulReplayCount()).toBe(0);
});

test('BrowserTestResult isReplayable', () => {
  const browser: Edge = new Edge('foo', 42, 42);
  const action: Refresh = new Refresh('foo');

  const truthyActionTestResults: ActionTestResult[] = [
    new ActionTestResult(new Date(), action, true),
    new ActionTestResult(new Date(), action, true),
    new ActionTestResult(new Date(), action, true),
  ];
  const falsyActionTestResults: ActionTestResult[] = [
    new ActionTestResult(new Date(), action, true),
    new ActionTestResult(new Date(), action, false),
    new ActionTestResult(new Date(), action, true),
  ];
  
  const truthyTestResult: BrowserTestResult = new BrowserTestResult(new Date(), browser, truthyActionTestResults);
  const falsyTestResult: BrowserTestResult = new BrowserTestResult(new Date(), browser, falsyActionTestResults);

  expect(truthyTestResult.isReplayable()).toBe(true);
  expect(falsyTestResult.isReplayable()).toBe(false);
});

test('BrowserTestResult getSuccessfullReplayCount', () => {
  const browser: Edge = new Edge('foo', 42, 42);
  const action: Refresh = new Refresh('foo');

  const truthyActionTestResults: ActionTestResult[] = [
    new ActionTestResult(new Date(), action, true),
    new ActionTestResult(new Date(), action, true),
    new ActionTestResult(new Date(), action, true),
  ];
  const falsyActionTestResults: ActionTestResult[] = [
    new ActionTestResult(new Date(), action, true),
    new ActionTestResult(new Date(), action, false),
    new ActionTestResult(new Date(), action, true),
  ];
  
  const truthyTestResult: BrowserTestResult = new BrowserTestResult(new Date(), browser, truthyActionTestResults);
  const falsyTestResult: BrowserTestResult = new BrowserTestResult(new Date(), browser, falsyActionTestResults);

  expect(truthyTestResult.getSuccessfulReplayCount()).toBe(3);
  expect(falsyTestResult.getSuccessfulReplayCount()).toBe(2);
});
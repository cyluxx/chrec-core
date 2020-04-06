import { Identificable } from "./identififable";

export class LocatorTestResult extends Identificable {
  constructor(public replayable: boolean) {
    super();
  }
}

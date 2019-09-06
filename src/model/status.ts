export class Status {
  constructor(public code: Code, public message: string) { }

  public isOk(): boolean {
    return this.code === Code.OK;
  }
}

export enum Code {
  OK = 0,
  NO_SUCH_ELEMENT = 1,
  ACTION_FAILED = 2,
  HTML_ELEMENT_ACTION_FAILED = 3,
  READ_VALUE_NOT_IN_TEXT = 4,
  RECOMMENDED_LOCATOR_NOT_SPECIFIED = 5,
  ALEX_EXPORT_FAILED = 100,
}

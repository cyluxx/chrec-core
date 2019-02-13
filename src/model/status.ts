export class Status {
  constructor(private code: Code, private message: string) {}

  public getCode(): Code {
    return this.code;
  }

  public getMessage(): string {
    return this.message;
  }

  public toBoolean(): boolean {
    return this.code === Code.OK;
  }
}

export enum Code {
  OK = 0,
  NO_SUCH_ELEMENT = 1,
}
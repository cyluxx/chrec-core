import { Locator } from "./locator";

export class CssLocator extends Locator {
    constructor(methodName: string, value: string) {
        super(methodName, value);
    }
}
import { Browser } from "./browser/browser";

export class Settings {
    constructor(private seleniumGridUrl: string, private browsers: Browser[]) { }
}
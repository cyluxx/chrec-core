import { Browser } from "./browser";

export class Firefox extends Browser {
    constructor(name: string, width: number, height: number) {
        super(name, width, height);
    }
}
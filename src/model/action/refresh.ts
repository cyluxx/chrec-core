import { Action } from "./action";

export class Refresh extends Action {
    constructor(image: string) {
        super(image);
    }
}
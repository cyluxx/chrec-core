import { Action } from "./action/action";

export class Sequence {
    constructor(private name: string, private actions: Action[]) { }
}
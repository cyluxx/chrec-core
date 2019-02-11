import { Locator } from "../../locator/locator";
import { Action } from "../action";

export abstract class HtmlElementAction extends Action {
    constructor(image: string, private locators: Locator[], private boundingBox: DOMRect) {
        super(image);
    }
}

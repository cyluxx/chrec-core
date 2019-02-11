import { Locator } from "../../locator/locator";
import { HtmlElementAction } from "./html-element-action";

export class Click extends HtmlElementAction {
    constructor(image: string, locators: Locator[], boundingBox: DOMRect) {
        super(image, locators, boundingBox);
    }
}
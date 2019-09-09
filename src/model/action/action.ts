import { WebDriver } from 'selenium-webdriver';
import { Action as AlexAction } from '../../export/alex/action';
import { Status } from '../status';
import { Back } from './back';
import { Forward } from './forward';
import { GoTo, GoToJSON } from './go-to';
import { HtmlElementAction, HtmlElementActionJSON } from './html-element-action/html-element-action';
import { Refresh } from './refresh';
import { SwitchToDefaultContext } from './switch-to-default-context';

export interface ActionJSON {
  className: string,
  image: string
}

export abstract class Action {
  
  public static fromJSON(json: ActionJSON): Action {
    switch (json.className) {
      case Back.constructor.name:
        return Back.fromJSON(json);

      case Forward.constructor.name:
        return Forward.fromJSON(json);

      case GoTo.constructor.name:
        return GoTo.fromJSON(json as GoToJSON);

      case Refresh.constructor.name:
        return Refresh.fromJSON(json);

      case SwitchToDefaultContext.constructor.name:
        return SwitchToDefaultContext.fromJSON(json);

      default:
        return HtmlElementAction.fromJSON(json as HtmlElementActionJSON);
    }
  }

  constructor(public image: string) { }

  public toJSON(): ActionJSON {
    return Object.assign({ className: this.constructor.name }, this);
  }

  public abstract async run(driver: WebDriver): Promise<Status>;

  public abstract toAlexActions(): AlexAction[];
}

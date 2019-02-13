import { Browser } from './browser';

export class Chrome extends Browser {
  constructor(name: string, width: number, height: number, private headless: boolean) {
    super(name, width, height);
  }
}

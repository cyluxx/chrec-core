import { v4 as uuidv4 } from 'uuid';

export class Identificable {
  public id: string;

  constructor() {
    this.id = uuidv4();
  }
}

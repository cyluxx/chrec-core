import { v4 as uuidv4 } from 'uuid';

export class Identificable {
  public id: string;

  constructor(id?: string) {
    id ? (this.id = id) : (this.id = uuidv4());
  }
}

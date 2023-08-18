import { IPainting } from "src/app/services/paintings.service";

export class Get {
    static readonly type = '[Basket] Get';
  }
  
  export class Add {
    static readonly type = '[Basket] Add';
    constructor(public painting: IPainting) { }
  }
  
  export class Delete {
    static readonly type = '[Basket] Delete';
    constructor(public id: number) { }
  }



import { IPainting } from "../services/paintings.service";

export class Get {
    static readonly type = '[Painting] Get';
}
export class GetSuccess {
    static readonly type = '[Painting] Get Success';
    constructor(public paintings: IPainting[]){}
}
export class GetFailure {
    static readonly type = '[Painting] Get Failure';
    constructor(public readonly error: Error){}
}
export class Search {
    static readonly type = '[Product] Search';
    constructor(public search: string) {}
  }
  

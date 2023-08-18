import { ICategory } from "../services/categories.service";

export class Get {
    static readonly type = '[Category] Get';
}
export class GetSuccess {
    static readonly type = '[Category] Get Success';
    constructor(public categories: ICategory[]){}
}
export class GetFailure {
    static readonly type = '[Category] Get Failure';
    constructor(public readonly error: Error){}
}
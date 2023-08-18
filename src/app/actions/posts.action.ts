import { IPost } from "../services/posts.service";

export class Get {
    static readonly type = '[Post] Get';
}
export class GetSuccess {
    static readonly type = '[Post] Get Success';
    constructor(public posts: IPost[]){}
}
export class GetFailure {
    static readonly type = '[Post] Get Failure';
    constructor(public readonly error: Error){}
}
import { IReviewOfPainting } from "../services/reviews-of-paintings.service";

export class Get {
    static readonly type = '[ReviewOfPainting] Get';
    constructor(public id: number){}
}
export class GetSuccess {
    static readonly type = '[ReviewOfPainting] Get Success';
    constructor(public reviewsOfPaintings: IReviewOfPainting[]){}
}
export class GetFailure {
    static readonly type = '[ReviewOfPainting] Get Failure';
    constructor(public readonly error: Error){}
}
export class Post {
    static readonly type = '[ReviewOfPainting] Post';
    constructor(public review: IReviewOfPainting){}
}
export class PostSuccess {
    static readonly type = '[ReviewOfPainting] Post Success';
    constructor(public review: IReviewOfPainting){}
}
export class PostFailure {
    static readonly type = '[ReviewOfPainting] Post Failure';
    constructor(public readonly error: Error){}
}
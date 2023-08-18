import { IReview } from "../services/reviews.service";

export class Get {
    static readonly type = '[Review] Get';
}
export class GetSuccess {
    static readonly type = '[Review] Get Success';
    constructor(public reviews: IReview[]){}
}
export class GetFailure {
    static readonly type = '[Review] Get Failure';
    constructor(public readonly error: Error){}
}
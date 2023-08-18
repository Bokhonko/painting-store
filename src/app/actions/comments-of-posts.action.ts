import { ICommentOfPost } from "../services/comments-of-posts.service";

export class Get {
    static readonly type = '[CommentOfPost] Get';
    constructor(public id: number){}
}
export class GetSuccess {
    static readonly type = '[CommentOfPost] Get Success';
    constructor(public commentsOfPosts: ICommentOfPost[]){}
}
export class GetFailure {
    static readonly type = '[CommentOfPost] Get Failure';
    constructor(public readonly error: Error){}
}
export class Post {
    static readonly type = '[CommentOfPost] Post';
    constructor(public comment: ICommentOfPost){}
}
export class PostSuccess {
    static readonly type = '[CommentOfPost] Post Success';
    constructor(public comment: ICommentOfPost){}
}
export class PostFailure {
    static readonly type = '[CommentOfPost] Post Failure';
    constructor(public readonly error: Error){}
}
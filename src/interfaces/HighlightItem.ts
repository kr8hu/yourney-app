import Post from "./Post";

export default interface HighlightItem {
    id?: number;
    title: string;
    text: string;
    image: string;
    post: Post
}
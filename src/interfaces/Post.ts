export default interface Post {
    _id: string;
    name: string;
    description: string;
    photos: Array<any>;
    locations: Array<any>;
    likes: Array<string>;
    category: string;
    author: string;
    approved: boolean;
    createdAt: string;
}

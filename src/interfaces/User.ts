export default interface User {
    _id: string;
    username: string;
    name: string;
    email: string;
    picture: string;
    regdate: string;
    group: number;
    activated: boolean;
}
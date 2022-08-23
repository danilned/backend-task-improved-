export type postId = {
    id: number,
    postId: number,
};

export type posts = {
    id: number,
    data: string,
    status: boolean,
};

export type postData = posts & postId;

export type auth = {
    login: string,
    password: string,
};

export type register = auth & {
    email: string,
    rights: number,
};

export type jwtStatus<T> = {
    jwt?: string,
    status: 200 | T,
}
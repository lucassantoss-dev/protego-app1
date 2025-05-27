export interface User {
    userId: string;
    name: string;
    email: string;
    photo?: string;
    roleName: string;
}

export interface Token {
    user: User;
    token: string;
}

export interface UserData {
    token: Token;
}

export interface UserContext {
    data: UserData;
} 
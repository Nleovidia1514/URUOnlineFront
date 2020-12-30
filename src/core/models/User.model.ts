export interface User {
    _id?: string;
    profileImg?: string;
    rating?: number;
    isActive?: boolean;
    identification?: number;
    birthdate?: Date;
    type?: string;
    phoneNumber?: string;
    email?: string;
    name?: string;
    lastname?: string;
    githubLink?: string;
    mfa?: boolean;
}
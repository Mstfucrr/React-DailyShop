export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    termAndConditionId: number;
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface IUser {
    id: number;
    name: string;
    surname: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    profileImage: string;
    phone: string;
    addresses: IUserAddress[];
}

export interface IUserAddress {
    id: number;
    title : string;
    description : string;
    isMain : boolean;
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: number;
}

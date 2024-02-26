import { Dispatch, SetStateAction, } from "react";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
    status: boolean;
}

export interface IModifyUserProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    modifyUser?: IUser | undefined
}
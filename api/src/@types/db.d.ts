import { Role } from "../models/index";

export interface IUser {
        id: number;
        email: string;
        firstname?: string;
        lastname?:string;
        pseudo: string;
        password:String;
        urlProfilImage?:String;
        role: Role
}

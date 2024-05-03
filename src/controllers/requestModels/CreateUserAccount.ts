import { EmailT } from "../types/EmailT.js";

export class CreateUserAccount {
    username!: EmailT;
    password!: string;
    first_name!: string;
    last_name!: string;
}

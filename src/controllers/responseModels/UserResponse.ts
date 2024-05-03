import { IResponseModel } from "./IResponseModel.js";
import { EmailT } from "../types/EmailT.js";
import { User } from "../../entities/User.js";
import { UUID } from "../types/UUID.js";

export class UserResponse implements IResponseModel<User> {

  constructor(entity: User) {
    this.id = entity.id;
    this.first_name = entity.first_name;
    this.last_name = entity.last_name;
    this.username = entity.username;
    this.account_created = entity.dateCreated;
    this.account_updated = entity.lastModified;
  }
  
  id: UUID;
  first_name: string;
  last_name: string;
  username: EmailT;
  account_created: Date;
  account_updated: Date;

  createFromEntity(entity: User): IResponseModel<User> {
    return new UserResponse(entity);
  }
}

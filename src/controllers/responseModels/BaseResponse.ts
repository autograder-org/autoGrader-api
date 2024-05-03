import { CloudBaseEntity } from "../../entities/CloudBaseEntity.js";
import { UUID } from "../types/UUID.js";

export class BaseResponse {
    constructor(entity: CloudBaseEntity) {
        this.id = entity.id;
        this.dateCreated = entity.dateCreated;
        this.lastModified = entity.lastModified;
    }
    /**
     * Id of record
     */
    id: UUID;
    /**
     * Date of record creation
     */
    dateCreated: Date;
    /**
     * Date record was last modified
     */
    lastModified: Date;

    static initFromEntity<T extends BaseResponse>(entity: CloudBaseEntity) {
        return new BaseResponse(entity) as T;
    }
}

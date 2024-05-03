import { IResponseModel } from "./responseModels/IResponseModel.js";

export function ModelMapper<T, R extends IResponseModel<T>>(
    mapToClass: new (entity: T) => R,
    entity: T
): R {
    return new mapToClass(entity).createFromEntity(entity) as R;
}

export default ModelMapper;

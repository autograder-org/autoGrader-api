export interface IResponseModel<T> {
    createFromEntity(entity: T): IResponseModel<T>;
}

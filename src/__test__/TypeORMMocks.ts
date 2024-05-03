import { randomUUID } from "crypto";
import { FindManyOptions } from "typeorm";

const mockCreateQueryBuilder = jest.fn(() => mockQueryBuilder());
const mockQueryBuilder = jest.fn().mockImplementation(() => {
    return {
        loadAllRelationIds: mockQueryBuilderLoadAllRelationIds,
        where: mockWhere,
        andWhere: mockAndWhere,
        create: mockCreate,
        take: mockQueryBuilderTake,
        skip: mockQueryBuilderSkip,
        orderBy: mockQueryBuilderOrderBy,
        getMany: mockQueryBuilderGetMany,
        getManyAndCount: mockQueryBuilderGetManyAndCount,
        leftJoinAndSelect: mockQueryBuilderLeftJoinAndSelect,
    };
});
const entityMock = {
    create: (i: any) => mockCreate(i),
    save: (i: any) => mockSave(i),
    find: (i: any) => mockFind(i),
    findBy: (u: any) => mockFindBy(u),
    findOneBy: (u: any) => mockFindOneBy(u),
    remove: (u: any) => mockRemove(u),
    createQueryBuilder: () => mockCreateQueryBuilder(),
    groups: [],
};
const mockWhere = jest.fn().mockReturnThis();
const mockAndWhere = jest.fn().mockReturnThis();
const mockFindBy = jest.fn((u) => {
    const result = { ...entityMock, ...u };
    return Promise.resolve([result]);
});
const mockFindAndCount = jest.fn((o) => {
    const result = [{ ...entityMock }, { ...entityMock }];
    return Promise.resolve([result, result.length]);
});
const mockFindOneBy = jest.fn((u) => {
    const result = { ...entityMock, ...u };
    return Promise.resolve(result);
});
const mockFindOne = jest.fn((u) => {
    const result = { ...entityMock, ...u };
    return Promise.resolve(result);
});
const mockCreate = jest.fn((u) => {
    u = u ?? {};
    u.id = u.id ?? randomUUID();
    return { ...entityMock, ...u };
});
const mockFind = jest.fn((o: FindManyOptions<any>) => {
    return Promise.resolve([{ ...entityMock }]);
});
const mockSave = jest.fn((i) => {
    if (Array.isArray(i))
        return Promise.resolve(i.map((e) => ({ ...e, ...i })));
    return Promise.resolve({ ...entityMock, ...i });
});
const mockRemove = jest.fn((u) => {
    u = u ?? {};
    u.id = undefined;
    return { ...entityMock, ...u };
});

const mockQueryBuilderLoadAllRelationIds = jest.fn(() => mockQueryBuilder());
const mockQueryBuilderLeftJoinAndSelect = jest.fn(() => mockQueryBuilder());
const mockQueryBuilderTake = jest.fn(() => mockQueryBuilder());
const mockQueryBuilderSkip = jest.fn(() => mockQueryBuilder());
const mockQueryBuilderOrderBy = jest.fn(() => mockQueryBuilder());
const mockQueryBuilderGetMany = jest.fn(() => Promise.resolve([]));
const mockQueryBuilderGetManyAndCount = jest.fn(() =>
    Promise.resolve([[] as any[], 0])
);

export {
    mockCreateQueryBuilder,
    mockQueryBuilder,
    entityMock,
    mockWhere,
    mockFindBy,
    mockFindOneBy,
    mockFindOne,
    mockCreate,
    mockFind,
    mockSave,
    mockRemove,
    mockQueryBuilderLoadAllRelationIds,
    mockQueryBuilderLeftJoinAndSelect,
    mockQueryBuilderTake,
    mockQueryBuilderSkip,
    mockQueryBuilderOrderBy,
    mockQueryBuilderGetManyAndCount,
    mockFindAndCount,
};
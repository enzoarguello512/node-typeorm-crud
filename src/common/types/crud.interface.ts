// Generics could be used
export interface ICrud {
  create: (resource: any) => Promise<any>;
  list: (limit: number, page: number) => Promise<any[]>;
  readById: (id: string, alreadyFetchedEntity?: any) => Promise<any | null>;
  updateById: (resource: any, alreadyFetchedEntity: any) => Promise<any>;
  deleteById: (alreadyFetchedEntity: any) => Promise<any>;
}

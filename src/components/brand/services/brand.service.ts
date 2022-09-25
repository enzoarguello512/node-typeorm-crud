import { ICrud } from '../../../common/types/crud.interface';
import { ICreateBrandDto } from '../dto/create.brand.dto';
import { BrandsDao } from '../daos/brand.dao';
import { Brand } from '../entity/brand.entity';

const dao = new BrandsDao();

export class BrandsService implements ICrud {
  async create(resource: ICreateBrandDto): Promise<Brand> {
    return dao.create(resource);
  }

  async list(limit: number, page: number): Promise<Brand[]> {
    return dao.list(limit, page);
  }

  async readById(
    id: string,
    alreadyFetchedBrand?: Brand
  ): Promise<Brand | null> {
    return dao.readById(id, alreadyFetchedBrand);
  }

  async updateById(
    resource: ICreateBrandDto,
    alreadyFetchedBrand: Brand
  ): Promise<Brand> {
    return dao.updateById(resource, alreadyFetchedBrand);
  }

  async deleteById(alreadyFetchedBrand: Brand): Promise<Brand> {
    return dao.deleteById(alreadyFetchedBrand);
  }
}

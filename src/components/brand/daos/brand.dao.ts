import debug from 'debug';
import { ICreateBrandDto } from '../dto/create.brand.dto';
import BaseError from '../../../common/error/base.error';
import { ICrud } from '../../../common/types/crud.interface';
import { Brand } from '../entity/brand.entity';
import { QueryFailedError } from 'typeorm';
import { BadRequestError } from '../../../common/error/bad.request.error';
import { Vehicle } from '../../vehicle/entity/vehicle.entity';

const log: debug.IDebugger = debug('app:brands-dao');

export class BrandsDao implements ICrud {
  constructor() {
    log('Created new instance of BrandsDao');
  }

  public async create(brandFields: ICreateBrandDto) {
    try {
      const brand = Brand.create({ ...brandFields });
      if (brandFields.vehiclesId) {
        const vehicles = await Vehicle.findByIds(brandFields.vehiclesId);
        brand.vehicles = vehicles;
      }
      return await brand.save();
    } catch (err) {
      if (err instanceof QueryFailedError && err.driverError.code === '23503') {
        throw new BadRequestError(err.driverError.detail, 'create');
      }
      throw new BaseError('Failed to save brand', err, 'create');
    }
  }

  public async list(limit: number, page: number) {
    try {
      return await Brand.find({
        relations: {
          vehicles: true,
        },
      });
    } catch (err) {
      throw new BaseError('Failed to search for brands', err, 'list');
    }
  }

  public async readById(brandId: string, alreadyFetchedBrand?: Brand) {
    try {
      if (alreadyFetchedBrand) return alreadyFetchedBrand;
      return await Brand.findOne({
        where: {
          id: parseInt(brandId),
        },
        relations: {
          vehicles: true,
        },
      });
    } catch (err) {
      throw new BaseError('Failed to find brand', err, 'readById');
    }
  }

  public async updateById(
    brandFields: ICreateBrandDto,
    alreadyFetchedBrand: Brand
  ) {
    try {
      alreadyFetchedBrand = {
        ...alreadyFetchedBrand,
        ...brandFields,
      } as unknown as Brand;
      // To prevent creating a new brand
      const { id: brandId } = alreadyFetchedBrand;
      if (typeof brandId === 'string') {
        alreadyFetchedBrand.id = parseInt(brandId);
      }
      if (brandFields.vehiclesId) {
        const vehicles = await Vehicle.findByIds(brandFields.vehiclesId);
        alreadyFetchedBrand.vehicles = vehicles;
      }
      return await Brand.save(alreadyFetchedBrand); // Update by id
    } catch (err) {
      if (err instanceof QueryFailedError && err.driverError.code === '23503') {
        throw new BadRequestError(err.driverError.detail, 'create');
      }
      throw new BaseError('Failed to update brand', err, 'updateById');
    }
  }

  public async deleteById(alreadyFetchedBrand: Brand) {
    try {
      return await Brand.remove(alreadyFetchedBrand);
    } catch (err) {
      throw new BaseError('Failed to remove brand', err, 'deleteById');
    }
  }
}

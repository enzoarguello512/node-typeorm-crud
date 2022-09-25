import debug from 'debug';
import { ICreateColorDto } from '../dto/create.color.dto';
import BaseError from '../../../common/error/base.error';
import { ICrud } from '../../../common/types/crud.interface';
import { Color } from '../entity/color.entity';
import { QueryFailedError } from 'typeorm';
import { BadRequestError } from '../../../common/error/bad.request.error';
import { Vehicle } from '../../vehicle/entity/vehicle.entity';

const log: debug.IDebugger = debug('app:vehicles-dao');

export class ColorsDao implements ICrud {
  constructor() {
    log('Created new instance of ColorsDao');
  }

  public async create(colorFields: ICreateColorDto) {
    try {
      const color = Color.create({ ...colorFields });
      if (colorFields.vehiclesId) {
        const vehicles = await Vehicle.findByIds(colorFields.vehiclesId);
        color.vehicles = vehicles;
      }
      return await color.save();
    } catch (err) {
      if (err instanceof QueryFailedError) {
        switch (err.driverError.code) {
          case '23503':
          case '23505':
            throw new BadRequestError(err.driverError.detail, 'create');
        }
      }
      throw new BaseError('Failed to save color', err, 'create');
    }
  }

  public async list(limit: number, page: number) {
    try {
      return await Color.find({
        relations: {
          vehicles: true,
        },
      });
    } catch (err) {
      throw new BaseError('Failed to search for colors', err, 'list');
    }
  }

  public async readById(colorId: string, alreadyFetchedColor?: Color) {
    try {
      if (alreadyFetchedColor) return alreadyFetchedColor;
      return await Color.findOne({
        where: {
          id: parseInt(colorId),
        },
        relations: {
          vehicles: true,
        },
      });
    } catch (err) {
      throw new BaseError('Failed to find color', err, 'readById');
    }
  }

  public async updateById(
    colorFields: ICreateColorDto,
    alreadyFetchedColor: Color
  ) {
    try {
      alreadyFetchedColor = {
        ...alreadyFetchedColor,
        ...colorFields,
      } as unknown as Color;
      // To prevent creating a new color
      const { id: colorId } = alreadyFetchedColor;
      if (typeof colorId === 'string') {
        alreadyFetchedColor.id = parseInt(colorId);
      }
      if (colorFields.vehiclesId) {
        const vehicles = await Vehicle.findByIds(colorFields.vehiclesId);
        alreadyFetchedColor.vehicles = vehicles;
      }
      return await Color.save(alreadyFetchedColor); // Update by id
    } catch (err) {
      if (err instanceof QueryFailedError && err.driverError.code === '23503') {
        throw new BadRequestError(err.driverError.detail, 'create');
      }
      throw new BaseError('Failed to update color', err, 'updateById');
    }
  }

  public async deleteById(alreadyFetchedColor: Color) {
    try {
      return await Color.remove(alreadyFetchedColor);
    } catch (err) {
      throw new BaseError('Failed to remove color', err, 'deleteById');
    }
  }
}

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
      // This prevents the undefined error in case the user does not send us the vehiclesId property.
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
      // This is because of the middleware we are using previously (validateColorExists) to check if
      // the color exists and prevents making another request to the server.
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
      throw new BaseError('Failed to find color by id', err, 'readById');
    }
  }

  public async readByName(name: string) {
    try {
      return await Color.findOneBy({ name });
    } catch (err) {
      throw new BaseError('Failed to find color by name', err, 'readByName');
    }
  }

  public async updateById(
    colorFields: ICreateColorDto,
    alreadyFetchedColor: Color
  ) {
    try {
      // Combine properties with the spread operator
      alreadyFetchedColor = {
        ...alreadyFetchedColor,
        ...colorFields,
      } as unknown as Color;
      // To prevent creating a new color
      const { id: colorId } = alreadyFetchedColor;
      if (typeof colorId === 'string') {
        alreadyFetchedColor.id = parseInt(colorId);
      }
      // This prevents the undefined error in case the user does not send us the vehiclesId property.
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

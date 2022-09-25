import debug from 'debug';
import { ICreateVehicleDto } from '../dto/create.vehicle.dto';
import { IPutVehicleDto } from '../dto/put.vehicle.dto';
import BaseError from '../../../common/error/base.error';
import { ICrud } from '../../../common/types/crud.interface';
import { Vehicle } from '../entity/vehicle.entity';
import { QueryFailedError } from 'typeorm';
import { BadRequestError } from '../../../common/error/bad.request.error';
import { Color } from '../../color/entity/color.entity';

const log: debug.IDebugger = debug('app:vehicles-dao');

export class VehiclesDao implements ICrud {
  constructor() {
    log('Created new instance of VehiclesDao');
  }

  public async create(vehicleFields: ICreateVehicleDto) {
    try {
      const vehicle = Vehicle.create({ ...vehicleFields });
      if (vehicleFields.colorsId) {
        const colors = await Color.findByIds(vehicleFields.colorsId);
        vehicle.colors = colors;
      }
      return await vehicle.save();
    } catch (err) {
      if (err instanceof QueryFailedError && err.driverError.code === '23503') {
        throw new BadRequestError(err.driverError.detail, 'create');
      }
      throw new BaseError('Failed to save vehicle', err, 'create');
    }
  }

  public async list(limit: number, page: number) {
    try {
      return await Vehicle.find({
        relations: {
          brand: true,
          colors: true,
        },
      });
    } catch (err) {
      throw new BaseError('Failed to search for vehicles', err, 'list');
    }
  }

  public async readById(vehicleId: string, alreadyFetchedVehicle?: Vehicle) {
    try {
      if (alreadyFetchedVehicle) return alreadyFetchedVehicle;
      return await Vehicle.findOne({
        where: {
          id: parseInt(vehicleId),
        },
        relations: {
          brand: true,
          colors: true,
        },
      });
    } catch (err) {
      throw new BaseError('Failed to find vehicle', err, 'readById');
    }
  }

  public async updateById(
    vehicleFields: IPutVehicleDto,
    alreadyFetchedVehicle: Vehicle
  ) {
    try {
      alreadyFetchedVehicle = {
        ...alreadyFetchedVehicle,
        ...vehicleFields,
      } as unknown as Vehicle;
      // To prevent creating a new vehicle
      const { id: vehicleId } = alreadyFetchedVehicle;
      if (typeof vehicleId === 'string') {
        alreadyFetchedVehicle.id = parseInt(vehicleId);
      }
      if (vehicleFields.colorsId) {
        const colors = await Color.findByIds(vehicleFields.colorsId);
        alreadyFetchedVehicle.colors = colors;
      }
      return await Vehicle.save(alreadyFetchedVehicle); // Update by id
    } catch (err) {
      if (err instanceof QueryFailedError && err.driverError.code === '23503') {
        throw new BadRequestError(err.driverError.detail, 'create');
      }
      throw new BaseError('Failed to update vehicle', err, 'updateById');
    }
  }

  public async deleteById(alreadyFetchedVehicle: Vehicle) {
    try {
      return await Vehicle.remove(alreadyFetchedVehicle);
    } catch (err) {
      throw new BaseError('Failed to remove vehicle', err, 'deleteById');
    }
  }
}

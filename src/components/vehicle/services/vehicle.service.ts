import { ICrud } from '../../../common/types/crud.interface';
import { ICreateVehicleDto } from '../dto/create.vehicle.dto';
import { IPutVehicleDto } from '../dto/put.vehicle.dto';
import { VehiclesDao } from '../daos/vehicle.dao';
import { Vehicle } from '../entity/vehicle.entity';

const dao = new VehiclesDao();

export class VehiclesService implements ICrud {
  async create(resource: ICreateVehicleDto): Promise<Vehicle> {
    return dao.create(resource);
  }

  async list(limit: number, page: number): Promise<Vehicle[]> {
    return dao.list(limit, page);
  }

  async readById(
    id: string,
    alreadyFetchedVehicle?: Vehicle
  ): Promise<Vehicle | null> {
    return dao.readById(id, alreadyFetchedVehicle);
  }

  async updateById(
    resource: IPutVehicleDto,
    alreadyFetchedVehicle: Vehicle
  ): Promise<Vehicle> {
    return dao.updateById(resource, alreadyFetchedVehicle);
  }

  async deleteById(alreadyFetchedVehicle: Vehicle): Promise<Vehicle> {
    return dao.deleteById(alreadyFetchedVehicle);
  }
}

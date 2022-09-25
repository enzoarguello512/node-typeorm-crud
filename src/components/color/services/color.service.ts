import { ICrud } from '../../../common/types/crud.interface';
import { ICreateColorDto } from '../dto/create.color.dto';
import { ColorsDao } from '../daos/color.dao';
import { Color } from '../entity/color.entity';

const dao = new ColorsDao();

export class ColorsService implements ICrud {
  async create(resource: ICreateColorDto): Promise<Color> {
    return dao.create(resource);
  }

  async list(limit: number, page: number): Promise<Color[]> {
    return dao.list(limit, page);
  }

  async readById(
    id: string,
    alreadyFetchedColor?: Color
  ): Promise<Color | null> {
    return dao.readById(id, alreadyFetchedColor);
  }

  async readByName(name: string): Promise<Color | null> {
    return dao.readByName(name);
  }

  async updateById(
    resource: ICreateColorDto,
    alreadyFetchedColor: Color
  ): Promise<Color> {
    return dao.updateById(resource, alreadyFetchedColor);
  }

  async deleteById(alreadyFetchedColor: Color): Promise<Color> {
    return dao.deleteById(alreadyFetchedColor);
  }
}

import { DeepPartial, FindConditions, Repository } from 'typeorm';
import { MyBaseEntity } from '@app/models/entity/base';

export abstract class BaseRepository<
  T extends MyBaseEntity,
> extends Repository<T> {
  async xfind(id: string, query: FindConditions<any> = {}): Promise<T> {
    query = { ...query, deleted: false };
    return this.findOne(id, { where: query });
  }
  async xfindAll(query: FindConditions<any> = {}) {
    query = { ...query, deleted: false };
    return this.findAndCount({ where: query });
  }
  async xcreate(e: DeepPartial<T>) {
    return this.create(e).save();
  }
  async xupdate(id: string, e: DeepPartial<T>) {
    e.updatedAt = new Date();
    return this.update(id, e);
  }
  async xdelete(id: string) {
    const entity = await this.findOne(id);
    entity.deleted = true;
    entity.updatedAt = new Date();
    return this.update(id, entity as any);
  }
}

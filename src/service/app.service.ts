import { Global, Injectable } from '@nestjs/common';
import { ICacheModel } from '@model';

@Injectable()
export class AppService {
  private _activeUser: ICacheModel | null = null;

  public setActiveUser(v: ICacheModel) {
    this._activeUser = v;
  }

  public getActiveUser(): ICacheModel {
    return this._activeUser;
  }
}

import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginPage } from '../../pages/login/login';
/*
  Generated class for the AuthLoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthLoginProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthLoginProvider Provider');
  }

}

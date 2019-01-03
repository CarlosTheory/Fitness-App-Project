//import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SignUpPage } from '../../pages/sign-up/sign-up';

/*
  Generated class for the GeoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class GeoProvider {

public provinces: any;

provincesVe = "../../assets/vnzla.json";

  constructor(public http: HttpClient) {
    console.log('Hello GeoProvider Provider');
  }

  getDataVenezuela(){
  	return this.http.get(this.provincesVe).map(res => res);
  }

}

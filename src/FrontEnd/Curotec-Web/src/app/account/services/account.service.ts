import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';

@Injectable()
export class AccountService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  registrarUsuario(user: User): Observable<User> {
    let response = this.http
      .post(this.UrlServiceV1 + 'new-account', user, this.ObterHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }

  login(usuario: User): Observable<User> {
    let response = this.http
      .post(this.UrlServiceV1 + 'login', usuario, this.ObterHeaderJson())
      .pipe(map(this.extractData), catchError(this.serviceError));

    return response;
  }
}

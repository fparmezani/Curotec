import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from 'src/app/services/base.service';
import { Contractor } from '../models/contractor';
import { Address } from '../models/address';

@Injectable()
export class ContractorService extends BaseService {
  contractor: Contractor = new Contractor();

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<Contractor[]> {
    return this.http
      .get<Contractor[]>(this.UrlServiceV1 + 'contractors')
      .pipe(catchError(super.serviceError));
  }

  getById(id: string): Observable<Contractor> {
    return this.http
      .get<Contractor>(
        this.UrlServiceV1 + 'contractors/' + id,
        super.ObterAuthHeaderJson()
      )
      .pipe(catchError(super.serviceError));
  }

  create(contractor: Contractor): Observable<Contractor> {
    return this.http
      .post(
        this.UrlServiceV1 + 'contractors',
        contractor,
        this.ObterAuthHeaderJson()
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  update(contractor: Contractor): Observable<Contractor> {
    return this.http
      .put(
        this.UrlServiceV1 + 'contractors/' + contractor.id,
        contractor,
        super.ObterAuthHeaderJson()
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  delete(id: string): Observable<Contractor> {
    return this.http
      .delete(
        this.UrlServiceV1 + 'contractors/' + id,
        super.ObterAuthHeaderJson()
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  updateAddress(address: Address): Observable<Address> {
    return this.http
      .put(
        this.UrlServiceV1 + 'contractors/address/' + address.id,
        address,
        super.ObterAuthHeaderJson()
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  // lookupCep(cep: string): Observable<CepConsulta> {
  //   return this.http
  //     .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json/`)
  //     .pipe(catchError(super.serviceError));
  // }
}

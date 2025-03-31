import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BaseService } from 'src/app/services/base.service';
import { Product, Contractor } from '../models/product';

@Injectable()
export class ProductService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  obterTodos(): Observable<Product[]> {
    return this.http
      .get<Product[]>(
        this.UrlServiceV1 + 'products',
        super.ObterAuthHeaderJson()
      )
      .pipe(catchError(super.serviceError));
  }

  obterPorId(id: string): Observable<Product> {
    return this.http
      .get<Product>(
        this.UrlServiceV1 + 'products/' + id,
        super.ObterAuthHeaderJson()
      )
      .pipe(catchError(super.serviceError));
  }

  novoProduto(produto: Product): Observable<Product> {
    return this.http
      .post(
        this.UrlServiceV1 + 'products',
        produto,
        super.ObterAuthHeaderJson()
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  atualizarProduto(produto: Product): Observable<Product> {
    return this.http
      .put(
        this.UrlServiceV1 + 'products/' + produto.id,
        produto,
        super.ObterAuthHeaderJson()
      )
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  excluirProduto(id: string): Observable<Product> {
    return this.http
      .delete(this.UrlServiceV1 + 'produtos/' + id, super.ObterAuthHeaderJson())
      .pipe(map(super.extractData), catchError(super.serviceError));
  }

  obterFornecedores(): Observable<Contractor[]> {
    return this.http
      .get<Contractor[]>(this.UrlServiceV1 + 'contractors')
      .pipe(catchError(super.serviceError));
  }
}

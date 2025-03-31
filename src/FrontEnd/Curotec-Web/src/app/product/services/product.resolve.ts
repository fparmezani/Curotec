import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from './product.service';

@Injectable()
export class ProductResolve implements Resolve<Product> {
  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.productService.obterPorId(route.params['id']);
  }
}

import { Component, Input } from '@angular/core';
//import { Product } from 'src/app/product/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'list-products',
  templateUrl: './list-products.component.html',
})
export class ListProductsComponent {
  @Input()
  products: [] | any;
}

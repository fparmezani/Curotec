import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent {
  product: Product | any;

  constructor(private route: ActivatedRoute) {
    this.product = this.route.snapshot.data['product'];
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

import { ToastrService } from 'ngx-toastr';

import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
})
export class DeleteComponent {
  imagens: string = environment.imagensUrl;
  product: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.product = this.route.snapshot.data['product'];
  }

  public excluirProduto() {
    this.productService.excluirProduto(this.product.id).subscribe(
      (event) => {
        this.sucessoExclusao(event);
      },
      () => {
        this.falha();
      }
    );
  }

  public sucessoExclusao(evento: any) {
    const toast = this.toastr.success(
      'Produto excluido com Sucesso!',
      'Good bye :D'
    );
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/product/list-all']);
      });
    }
  }

  public falha() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}

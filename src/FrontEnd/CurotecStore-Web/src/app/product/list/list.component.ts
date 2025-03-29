import { Component, OnInit } from '@angular/core';
import { Produto } from '../models/product';
import { ProdutoService } from '../services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
})
export class ListaComponent implements OnInit {
  imagens: string = environment.imagensUrl;

  public produtos: Produto[];
  errorMessage: string;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtoService.obterTodos().subscribe(
      (produtos) => (this.produtos = produtos),
      (error) => this.errorMessage
    );
  }
}

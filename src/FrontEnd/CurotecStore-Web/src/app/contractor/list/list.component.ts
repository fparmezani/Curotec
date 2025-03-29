import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../services/contractor.service';
import { Fornecedor } from '../models/contractor';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
})
export class ListaComponent implements OnInit {
  public fornecedores: Fornecedor[];
  errorMessage: string;

  constructor(private fornecedorService: FornecedorService) {}

  ngOnInit(): void {
    this.fornecedorService.obterTodos().subscribe(
      (fornecedores) => (this.fornecedores = fornecedores),
      (error) => this.errorMessage
    );
  }
}

import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ProductService } from '../services/product.service';
import { environment } from 'src/environments/environment';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { ProductBaseComponent } from '../product-form.base.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent extends ProductBaseComponent implements OnInit {
  imagens: string = environment.imagensUrl;

  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    super();
    this.product = this.route.snapshot.data['product'];
  }

  ngOnInit(): void {
    this.productService
      .obterFornecedores()
      .subscribe((contractors) => (this.contractors = contractors));

    this.productForm = this.fb.group({
      fornecedorId: ['', [Validators.required]],
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200),
        ],
      ],
      descricao: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(1000),
        ],
      ],
      imagem: [''],
      valor: ['', [Validators.required]],
      ativo: [0],
    });

    this.productForm.patchValue({
      fornecedorId: this.product.contractorId,
      id: this.product.id,
      name: this.product.name,
      description: this.product.description,
      active: this.product.active,
      value: CurrencyUtils.DecimalToString(this.product.value),
    });

    // utilizar o [src] na imagem para evitar que se perca após post
    // this.imagemOriginalSrc = this.imagens + this.product.imagem;
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  editarproduct() {
    if (this.productForm.dirty && this.productForm.valid) {
      this.product = Object.assign({}, this.product, this.productForm.value);

      this.product.valor = CurrencyUtils.StringToDecimal(this.product.valor);

      this.productService.atualizarProduto(this.product).subscribe(
        (sucesso) => {
          this.processarSucesso(sucesso);
        },
        (falha) => {
          this.processarFalha(falha);
        }
      );

      this.unsavedChanges = false;
    }
  }

  processarSucesso(response: any) {
    this.productForm.reset();
    this.errors = [];

    let toast = this.toastr.success('product editado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/products/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}

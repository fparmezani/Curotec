import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { ProductService } from '../services/product.service';
import { CurrencyUtils } from 'src/app/utils/currency-utils';
import { ProductBaseComponent } from '../product-form.base.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
})
export class NewComponent extends ProductBaseComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] | any;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  imageURL: string = '';
  imagemNome: string = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit(): void {
    this.productService
      .obterFornecedores()
      .subscribe((contractors) => (this.contractors = contractors));

    this.productForm = this.fb.group({
      contractorId: ['', [Validators.required]],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(1000),
        ],
      ],
      value: ['', [Validators.required]],
      active: [true],
    });
  }

  ngAfterViewInit(): void {
    super.configurarValidacaoFormulario(this.formInputElements);
  }

  adicionarProduto() {
    if (this.productForm.dirty && this.productForm.valid) {
      this.product = Object.assign({}, this.product, this.productForm.value);

      this.product.value = CurrencyUtils.StringToDecimal(this.product.valor);

      this.productService.novoProduto(this.product).subscribe({
        next: (sucesso: any) => {
          this.processarSucesso(sucesso);
        },
        error: (falha: any) => {
          this.processarFalha(falha);
        },
      });

      this.unsavedChanges = false;
    }
  }

  processarSucesso(response: any) {
    this.productForm.reset();
    this.errors = [];

    let toast = this.toastr.success(
      'Produto cadastrado com sucesso!',
      'Sucesso!'
    );
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produtos/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imagemNome = event.currentTarget.files[0].name;
  }
}

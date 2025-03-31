import { Product, Contractor } from './models/product';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { FormBaseComponent } from '../base-component/form-base.component';

export abstract class ProductBaseComponent extends FormBaseComponent {
  product: Product | any;
  contractors: Contractor[] = [];
  errors: any[] = [];
  productForm: FormGroup |any;

  constructor() {
    super();

    this.validationMessages = {
      fornecedorId: {
        required: 'Escolha um fornecedor',
      },
      nome: {
        required: 'Informe o Nome',
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 200 caracteres',
      },
      descricao: {
        required: 'Informe a Descrição',
        minlength: 'Mínimo de 2 caracteres',
        maxlength: 'Máximo de 1000 caracteres',
      },
      imagem: {
        required: 'Informe a Imagem',
      },
      valor: {
        required: 'Informe o Valor',
      },
    };

    super.configureBaseValidationMessages(this.validationMessages);
  }

  protected configurarValidacaoFormulario(formInputElements: ElementRef[]) {
    super.configureBaseFormValidation(
      formInputElements,
      this.productForm
    );
  }
}
